'use client'

import React, { useEffect, useRef, useState } from 'react'

const PhotoProcessor = () => {
  const [photos, setPhotos] = useState([])
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    setPhotos(files.slice(0, 10))
  }

  const handleChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setPhotos(files.slice(0, 10))
    }
  }

  const processPhotos = async () => {
    if (photos.length === 0) return

    setProcessing(true)
    try {
      const formData = new FormData()
      photos.forEach((photo) => {
        formData.append('photos', photo)
      })

      const response = await fetch('/api/process-photos', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Processing error:', error)
      alert('Error processing photos')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Photo Processor</h1>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-6 ${
            dragActive
              ? 'border-blue-500 bg-blue-900/30'
              : 'border-gray-500 bg-slate-700/50 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="text-5xl mb-3">📷</div>
          <h2 className="text-xl font-semibold text-white mb-2">Upload Photos</h2>
          <p className="text-gray-300 text-sm">Drag and drop or click to select</p>
          <p className="text-gray-400 text-xs mt-2">Max 10 photos, PNG/JPG/WebP</p>
        </div>

        {/* Photos List */}
        {photos.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3">Uploaded ({photos.length}/10)</h3>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, idx) => (
                <div key={idx} className="bg-slate-600/50 rounded p-2 text-sm text-gray-300 truncate">
                  ✓ {photo.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Button */}
        <button
          onClick={processPhotos}
          disabled={photos.length === 0 || processing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-6"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⌛</span>
              Processing...
            </span>
          ) : (
            '🚀 Process Photos'
          )}
        </button>

        {/* Results */}
        {results && (
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
            <h3 className="text-green-400 font-semibold text-lg mb-4">✓ Processing Complete</h3>
            <div className="space-y-3 text-gray-300">
              <p>Total Photos: <span className="text-white font-semibold">{results.totalPhotos}</span></p>
              <p>Objects Detected: <span className="text-white font-semibold">{results.detectedObjects}</span></p>
              <p>Timestamp: <span className="text-gray-400 text-sm">{new Date(results.timestamp).toLocaleString()}</span></p>
            </div>

            {results.photos && (
              <div className="mt-4 pt-4 border-t border-green-600/30">
                <h4 className="text-green-300 font-semibold mb-3">Details</h4>
                <div className="space-y-2">
                  {results.photos.map((photo, idx) => (
                    <div key={idx} className="bg-slate-700/30 rounded p-2 text-sm text-gray-300">
                      <p className="font-mono">{photo.filename}</p>
                      <p className="text-xs text-gray-400">Detected: {photo.detected} | Confidence: {photo.confidence}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoProcessor
