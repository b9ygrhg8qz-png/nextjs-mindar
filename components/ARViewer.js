'use client'

import React, { useEffect, useRef, useState } from 'react'

const ARViewer = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('Initializing...')
  const [detectedTargets, setDetectedTargets] = useState({})
  const [error, setError] = useState(null)

  const mindARRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const videoPlayersRef = useRef({})
  const videoMeshesRef = useRef({})
  const anchorsRef = useRef({})
  const animationIdRef = useRef(null)

  // Target configuration - map target index to video file
  const TARGET_CONFIG = {
    0: { video: '/fire_letter_A.mp4', name: 'Letter A', loop: false },
    1: { video: '/fire_letter_B.mp4', name: 'Letter B', loop: false },
    2: { video: '/fire_letter_C.mp4', name: 'Letter C', loop: false },
    3: { video: '/fire_letter_D.mp4', name: 'Letter D', loop: false },
  }

  useEffect(() => {
    let isMounted = true
    let streamTracks = []

    const initializeMindAR = async () => {
      try {
        if (!isMounted) return

        setStatus('Loading MindAR library...')

        // Wait for MindAR and THREE to be available globally
        let MINDAR = null
        let THREE = null
        let attempts = 0
        const maxAttempts = 100 // 10 seconds with 100ms intervals

        console.log('Waiting for MindAR and THREE.js...')

        while ((!window.MINDAR || !window.THREE) && attempts < maxAttempts && isMounted) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
          if (attempts % 10 === 0) {
            console.log(`Still loading... (${attempts / 10}s) - MINDAR: ${!!window.MINDAR}, THREE: ${!!window.THREE}`)
          }
        }

        MINDAR = window.MINDAR
        THREE = window.THREE

        console.log('Load status:', { MINDAR: !!MINDAR, THREE: !!THREE, attempts })

        if (!MINDAR || !MINDAR.IMAGE || !THREE) {
          throw new Error(
            `MindAR library failed to load. MINDAR: ${!!MINDAR}, THREE: ${!!THREE}. ` +
            `Check that /public/mindar-image-three.prod.js exists and Three.js is loaded from CDN.`
          )
        }

        if (!isMounted) return

        console.log('MindAR and THREE.js loaded successfully')

        setStatus('Requesting camera permission...')

        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop())
          return
        }

        streamTracks = stream.getTracks()

        // Set video source
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          try {
            await videoRef.current.play()
          } catch (e) {
            console.log('Video autoplay prevented')
          }
        }

        if (!isMounted) return

        setStatus('Initializing MindAR...')

        // Initialize MindAR Container
        const mindarContainer = new MINDAR.IMAGE.Container({
          canvas: canvasRef.current,
          video: videoRef.current,
          imageTargetSrc: '/targets.mind',
          maxTrack: 4,
        })

        if (!isMounted) return

        mindARRef.current = mindarContainer
        sceneRef.current = mindarContainer.scene
        cameraRef.current = mindarContainer.camera
        rendererRef.current = mindarContainer.renderer

        console.log('MindAR container created')

        setStatus('Setting up AR targets...')

        // Create video meshes for each target
        Object.keys(TARGET_CONFIG).forEach((targetIndex) => {
          const config = TARGET_CONFIG[targetIndex]
          const index = parseInt(targetIndex)

          // Create video element
          const videoElement = document.createElement('video')
          videoElement.src = config.video
          videoElement.crossOrigin = 'anonymous'
          videoElement.loop = config.loop
          videoElement.muted = true
          videoElement.playsInline = true
          videoPlayersRef.current[index] = videoElement

          // Create video texture
          const videoTexture = new THREE.VideoTexture(videoElement)
          videoTexture.minFilter = THREE.LinearFilter
          videoTexture.magFilter = THREE.LinearFilter
          videoTexture.format = THREE.RGBFormat

          // Create material with video texture
          const material = new THREE.MeshBasicMaterial({
            map: videoTexture,
            side: THREE.DoubleSide,
            transparent: false,
          })

          // Create geometry and mesh
          const geometry = new THREE.PlaneGeometry(1, 1)
          const mesh = new THREE.Mesh(geometry, material)
          mesh.scale.set(1.5, 1, 1)
          mesh.position.z = 0.1
          videoMeshesRef.current[index] = { mesh, videoTexture, videoElement }

          // Create anchor and add mesh
          const anchor = mindarContainer.addAnchor(index)
          anchorsRef.current[index] = anchor

          anchor.group.add(mesh)

          // Handle target found
          anchor.onTargetFound = () => {
            setDetectedTargets(prev => ({ ...prev, [index]: true }))
            setStatus(`${config.name} detected - Playing video`)
            console.log(`Target ${index} found`)

            // Start video
            if (videoElement) {
              videoElement.currentTime = 0
              const playPromise = videoElement.play()
              if (playPromise !== undefined) {
                playPromise.catch(err => {
                  console.log(`Video ${index} play failed:`, err)
                })
              }
            }
          }

          // Handle target lost
          anchor.onTargetLost = () => {
            setDetectedTargets(prev => ({ ...prev, [index]: false }))
            setStatus(`${config.name} lost - Waiting for detection`)
            console.log(`Target ${index} lost`)

            // Stop video and reset
            if (videoElement) {
              videoElement.pause()
              videoElement.currentTime = 0
            }
          }
        })

        if (!isMounted) return

        setStatus('Starting AR session...')

        // Start MindAR
        await mindarContainer.start()

        console.log('MindAR started successfully')

        if (!isMounted) return

        setStatus('Ready - Point camera at marker')

        // Render loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate)

          // Update video textures
          Object.values(videoMeshesRef.current).forEach(({ videoElement, videoTexture }) => {
            if (videoElement && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
              videoTexture.needsUpdate = true
            }
          })

          // Render scene
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current)
          }
        }

        animate()
      } catch (err) {
        console.error('MindAR initialization error:', err)
        if (isMounted) {
          setError(err.message || 'Failed to initialize MindAR')
          setStatus(`Error: ${err.message}`)
        }
      }
    }

    initializeMindAR()

    // Cleanup on unmount
    return () => {
      isMounted = false

      // Cancel animation frame
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      // Stop video playback
      Object.values(videoPlayersRef.current).forEach(video => {
        if (video) {
          video.pause()
          video.src = ''
        }
      })

      // Stop camera stream
      streamTracks.forEach(track => {
        if (track && track.stop) {
          track.stop()
        }
      })

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }

      // Dispose Three.js resources
      Object.values(videoMeshesRef.current).forEach(({ videoTexture, mesh }) => {
        if (videoTexture) videoTexture.dispose()
        if (mesh) {
          mesh.geometry.dispose()
          if (mesh.material) mesh.material.dispose()
        }
      })

      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          const child = sceneRef.current.children[0]
          sceneRef.current.remove(child)
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }

      // Stop MindAR
      if (mindARRef.current && mindARRef.current.stop) {
        mindARRef.current.stop().catch(err => console.log('Error stopping MindAR:', err))
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hidden video element for camera feed */}
      <video
        ref={videoRef}
        style={{
          display: 'none',
        }}
        playsInline
        autoPlay
        muted
      />

      {/* Canvas for AR rendering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          display: 'block',
        }}
      />

      {/* Status overlay */}
      <div className="absolute top-4 left-4 max-w-xs bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-mono text-sm border border-white/20">
        <p className={`flex items-center gap-2 ${
          Object.values(detectedTargets).some(v => v) ? 'text-green-400' : 'text-yellow-400'
        }`}>
          <span className={`text-lg ${
            Object.values(detectedTargets).some(v => v) ? 'animate-pulse' : 'animate-bounce'
          }`}>
            {Object.values(detectedTargets).some(v => v) ? '🟢' : '🔵'}
          </span>
          {status}
        </p>
      </div>

      {/* Detected targets info */}
      {Object.keys(detectedTargets).some(key => detectedTargets[key]) && (
        <div className="absolute top-4 right-4 bg-green-900/80 backdrop-blur-sm text-green-100 px-4 py-3 rounded-lg text-sm border border-green-500/30">
          <p className="font-semibold mb-1">Detected Targets:</p>
          {Object.entries(detectedTargets).map(([idx, detected]) => (
            detected && (
              <p key={idx} className="text-xs text-green-200">
                ✓ {TARGET_CONFIG[idx]?.name || `Target ${idx}`}
              </p>
            )
          ))}
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-red-900/90 text-red-100 px-6 py-4 rounded-lg max-w-sm border border-red-500/50">
            <p className="font-semibold mb-2">❌ Error</p>
            <p className="text-sm mb-3">{error}</p>
            <div className="text-xs text-red-300 space-y-1">
              <p>✓ Check console (F12 → Console)</p>
              <p>✓ Verify mindar-image-three.prod.js in public/</p>
              <p>✓ Verify targets.mind in public/</p>
              <p>✓ Check internet connection for Three.js CDN</p>
              <p>✓ Try hard refresh: Ctrl+Shift+R</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm text-center border border-white/20">
        <p className="font-semibold mb-1">📱 AR Video Player</p>
        <p className="text-xs text-gray-300">Point your camera at the marker image</p>
        <p className="text-xs text-gray-400 mt-1">Videos will play automatically when detected</p>
      </div>
    </div>
  )
}

export default ARViewer
