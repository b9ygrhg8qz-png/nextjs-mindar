export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const files = req.files || []

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No photos provided' })
    }

    // Process each photo
    const processedPhotos = []
    let totalObjects = 0

    // Simulate detection
    files.forEach((file) => {
      const detectedObjects = Math.floor(Math.random() * 5) + 1
      totalObjects += detectedObjects

      processedPhotos.push({
        filename: file.originalname || file.name,
        size: file.size || 0,
        detected: detectedObjects,
        confidence: (Math.random() * 0.4 + 0.6).toFixed(2),
      })
    })

    return res.status(200).json({
      success: true,
      totalPhotos: files.length,
      detectedObjects: totalObjects,
      photos: processedPhotos,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Processing error:', error)
    return res.status(500).json({ error: 'Processing failed' })
  }
}
