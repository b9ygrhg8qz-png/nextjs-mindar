import React, { useState } from 'react'
import PhotoUploader from '../components/PhotoUploader'
import ARProcessor from '../components/ARProcessor'
import VideoGenerator from '../components/VideoGenerator'

export default function Home() {
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [processedData, setProcessedData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePhotosUpload = (files) => {
    setUploadedPhotos(files.slice(0, 10))
  }

  const handleProcessing = (data) => {
    setProcessedData(data)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">MindAR Photo Recognition</h1>
        <p className="text-gray-300 text-center mb-8">Upload up to 10 photos and generate an MP4 video</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <PhotoUploader onUpload={handlePhotosUpload} />
            {uploadedPhotos.length > 0 && (
              <div className="mt-4 bg-slate-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Uploaded Photos ({uploadedPhotos.length}/10)</h3>
                <ul className="text-sm text-gray-300">
                  {uploadedPhotos.map((file, idx) => (
                    <li key={idx} className="truncate">✓ {file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Processing Section */}
          <div className="lg:col-span-1">
            {uploadedPhotos.length > 0 && (
              <ARProcessor 
                photos={uploadedPhotos} 
                onProcessing={handleProcessing}
              />
            )}
            {processedData && (
              <div className="mt-4 bg-green-900 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Processing Complete</h3>
                <p className="text-sm text-green-200">✓ {processedData.detectedObjects} objects detected</p>
              </div>
            )}
          </div>

          {/* Video Generation Section */}
          <div className="lg:col-span-1">
            {processedData && (
              <VideoGenerator 
                photos={uploadedPhotos}
                processedData={processedData}
                onGenerating={setIsGenerating}
              />
            )}
          </div>
        </div>

        {/* Status */}
        {isGenerating && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg">
            Generating video... please wait
          </div>
        )}
      </div>
    </main>
  )
}
