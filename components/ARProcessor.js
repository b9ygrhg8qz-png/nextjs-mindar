import React, { useState } from 'react'

export default function ARProcessor({ photos, onProcessing }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const processPhotos = async () => {
    setIsProcessing(true)
    setProgress(0)

    try {
      const formData = new FormData()
      photos.forEach((photo) => {
        formData.append('photos', photo)
      })

      const response = await fetch('/api/process-photos', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Processing failed')

      const data = await response.json()
      onProcessing(data)
      setProgress(100)
    } catch (error) {
      console.error('Error processing photos:', error)
      alert('Error processing photos')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">AR Processing</h2>
      
      <button
        onClick={processPhotos}
        disabled={isProcessing || photos.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block animate-spin">⏳</span>
            Processing ({progress}%)
          </span>
        ) : (
          '🚀 Process Photos'
        )}
      </button>

      {isProcessing && (
        <div className="mt-4">
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm mt-2 text-center">Analyzing images...</p>
        </div>
      )}
    </div>
  )
}
