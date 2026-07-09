import React, { useState } from 'react'

export default function VideoGenerator({ photos, processedData, onGenerating }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  const generateVideo = async () => {
    setIsGenerating(true)
    onGenerating(true)

    try {
      const formData = new FormData()
      photos.forEach((photo) => {
        formData.append('photos', photo)
      })
      formData.append('metadata', JSON.stringify(processedData))

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Video generation failed')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
    } catch (error) {
      console.error('Error generating video:', error)
      alert('Error generating video')
    } finally {
      setIsGenerating(false)
      onGenerating(false)
    }
  }

  const downloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a')
      a.href = videoUrl
      a.download = 'output.mp4'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Video Generation</h2>

      {!videoUrl ? (
        <button
          onClick={generateVideo}
          disabled={isGenerating}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⏳</span>
              Generating MP4...
            </span>
          ) : (
            '🎬 Generate MP4'
          )}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-600/50 rounded-lg p-4">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg"
            />
          </div>
          <button
            onClick={downloadVideo}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            📥 Download MP4
          </button>
        </div>
      )}
    </div>
  )
}
