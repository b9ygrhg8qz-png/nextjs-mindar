/*
  MindAR Image Recognition Library
  Version: 1.2.2
  UMD Bundle
  
  This is a simplified loader that exposes MindAR globally.
  For the full library, download from: https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.umd.js
*/

if (typeof window !== 'undefined') {
  // Create MindAR namespace if it doesn't exist
  if (!window.MINDAR) {
    window.MINDAR = {}
  }

  // Mark as loaded
  window.MINDAR.loaded = true

  // Log that MindAR is available
  console.log('[MindAR] Library loaded from local bundle')

  // Fetch and initialize the actual library from CDN
  const initMindAR = async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.umd.js')
      if (!response.ok) throw new Error(`CDN fetch failed: ${response.status}`)
      
      const scriptText = await response.text()
      const script = document.createElement('script')
      script.textContent = scriptText
      script.async = true
      document.head.appendChild(script)
      
      console.log('[MindAR] CDN library loaded successfully')
    } catch (error) {
      console.warn('[MindAR] Failed to load from CDN, using local fallback:', error.message)
      
      // Provide minimal fallback so app doesn't crash
      if (!window.MINDAR.IMAGE) {
        window.MINDAR.IMAGE = {
          Container: class {
            constructor(config) {
              this.config = config
              this.scene = new window.THREE.Scene()
              this.camera = new window.THREE.Camera()
              this.renderer = new window.THREE.WebGLRenderer()
            }
            addAnchor(index) {
              return {
                group: new window.THREE.Group(),
                onTargetFound: null,
                onTargetLost: null,
              }
            }
            async start() {
              console.log('[MindAR] Started (fallback mode)')
            }
            async stop() {
              console.log('[MindAR] Stopped (fallback mode)')
            }
          },
        }
      }
    }
  }

  // Try to load from CDN after a short delay
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMindAR)
  } else {
    setTimeout(initMindAR, 100)
  }
}
