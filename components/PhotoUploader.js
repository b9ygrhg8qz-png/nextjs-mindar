import React, { useRef, useState } from 'react'

export default function PhotoUploader({ onUpload }) {
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
    onUpload(files)
  }

  const handleChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onUpload(files)
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
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
      <p className="text-gray-300 text-sm">Drag and drop up to 10 photos here, or click to select</p>
      <p className="text-gray-400 text-xs mt-2">Supported: PNG, JPG, WebP</p>
    </div>
  )
}
