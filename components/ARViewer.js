'use client'

import React, { useEffect, useRef, useState } from 'react'

const ARViewer = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('Initializing...')
  const [markerDetected, setMarkerDetected] = useState(false)
  const videoPlayerRef = useRef(null)
  const MindARRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const videoTextureRef = useRef(null)
  const videoMeshRef = useRef(null)

  useEffect(() => {
    const initializeMindAR = async () => {
      try {
        setStatus('Loading MindAR...'
)
        
        // Dynamic import of MindAR
        const { MINDAR } = await import('mind-ar/dist/mindar-image-three.prod.js')
        const THREE = await import('three').then(m => m.default)

        MindARRef.current = MINDAR
        
        // Initialize camera stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }

        setStatus('Loading targets.mind...')

        // Initialize MindAR
        const mindarContainer = new MINDAR.IMAGE.Container({
          canvas: canvasRef.current,
          video: videoRef.current,
          imageTargetSrc: '/targets.mind',
        })

        sceneRef.current = mindarContainer.scene
        cameraRef.current = mindarContainer.camera
        rendererRef.current = mindarContainer.renderer

        // Create video player for the detected target
        const videoPlane = new THREE.Group()
        sceneRef.current.add(videoPlane)

        // Create video texture and mesh
        const canvas = document.createElement('canvas')
        canvas.width = 1280
        canvas.height = 720
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const texture = new THREE.CanvasTexture(canvas)
        const geometry = new THREE.PlaneGeometry(1, 1)
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.set(1.5, 1, 1)
        videoPlane.add(mesh)

        videoMeshRef.current = mesh
        videoTextureRef.current = texture

        // Create HTML video element
        const videoElement = document.createElement('video')
        videoElement.src = '/fire_letter_A.mp4'
        videoElement.crossOrigin = 'anonymous'
        videoElement.loop = false
        videoElement.muted = true
        videoPlayerRef.current = videoElement

        // Create texture from video
        const videoTexture = new THREE.VideoTexture(videoElement)
        videoTexture.minFilter = THREE.LinearFilter
        videoTexture.magFilter = THREE.LinearFilter
        videoTexture.format = THREE.RGBFormat

        material.map = videoTexture
        material.needsUpdate = true

        // Anchor to first image target
        const anchor = mindarContainer.addAnchor(0)
        anchor.group.add(videoPlane)

        // Event handlers
        anchor.onTargetFound = () => {
          setMarkerDetected(true)
          setStatus('Marker detected - Playing video')
          if (videoPlayerRef.current) {
            videoPlayerRef.current.currentTime = 0
            videoPlayerRef.current.play().catch(err => {
              console.log('Video play failed:', err)
            })
          }
        }

        anchor.onTargetLost = () => {
          setMarkerDetected(false)
          setStatus('Marker lost - Waiting for detection')
          if (videoPlayerRef.current) {
            videoPlayerRef.current.pause()
            videoPlayerRef.current.currentTime = 0
          }
        }

        setStatus('Starting AR session...')
        await mindarContainer.start()

        // Render loop
        const renderer = mindarContainer.renderer
        renderer.setAnimationLoop(() => {
          if (videoPlayerRef.current && videoTextureRef.current) {
            if (videoPlayerRef.current.readyState === videoPlayerRef.current.HAVE_ENOUGH_DATA) {
              videoTextureRef.current.needsUpdate = true
            }
          }
          renderer.render(sceneRef.current, cameraRef.current)
        })

        setStatus('Ready')
      } catch (error) {
        console.error('MindAR initialization error:', error)
        setStatus(`Error: ${error.message}`)
      }
    }

    initializeMindAR()

    return () => {
      // Cleanup
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
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
      />

      {/* Canvas for AR rendering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Status overlay */}
      <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg font-mono text-sm">
        <p className={markerDetected ? 'text-green-400' : 'text-yellow-400'}>
          {markerDetected ? '● ' : '○ '}
          {status}
        </p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white px-4 py-3 rounded-lg text-sm text-center">
        <p>📸 Point camera at your marker</p>
        <p className="text-xs text-gray-400 mt-2">Video will play automatically when marker is detected</p>
      </div>
    </div>
  )
}

export default ARViewer
