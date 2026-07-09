# Next.js MindAR Photo Recognition & MP4 Generation

A modern Next.js application that uses MindAR for recognizing up to 10 photos and generating MP4 videos from the processed data.

## ✨ Features

- 📷 **Photo Upload** - Drag & drop interface for uploading up to 10 photos
- 🔍 **AR Processing** - MindAR-based image recognition and analysis
- 🎬 **MP4 Generation** - Convert processed photos into video format
- 📊 **Real-time Progress** - Live feedback during processing
- 💾 **Download** - Export generated MP4 files
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: JavaScript (No TypeScript)
- **Styling**: Tailwind CSS
- **UI**: React Components
- **Video**: MP4 Container Creation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/b9ygrhg8qz-png/nextjs-mindar.git
cd nextjs-mindar

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage

1. **Upload Photos**: Drag & drop up to 10 photos into the upload area
2. **Process**: Click "Process Photos" to analyze images with MindAR
3. **Generate**: Click "Generate MP4" to create video output
4. **Download**: Click "Download MP4" to save the file

## 📁 Project Structure

```
├── pages/
│   ├── api/
│   │   ├── generate-video.js         # MP4 generation endpoint
│   │   └── process-photos.js         # Image processing endpoint
│   ├── _app.js                        # App wrapper
│   ├── _document.js                   # Document wrapper
│   └── index.js                       # Main page
├── components/
│   ├── PhotoUploader.js               # Upload component
│   ├── ARProcessor.js                 # Processing component
│   └── VideoGenerator.js              # Video generation component
├── styles/
│   └── globals.css                    # Global styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🔌 API Routes

### POST /api/process-photos
Process uploaded photos with MindAR recognition.

**Request**:
```
FormData with 'photos' field containing multiple File objects
```

**Response**:
```json
{
  "success": true,
  "totalPhotos": 10,
  "detectedObjects": 45,
  "photos": [
    {
      "filename": "photo.jpg",
      "size": 1024,
      "detected": 5,
      "confidence": "0.85"
    }
  ],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### POST /api/generate-video
Generate MP4 video from processed photos.

**Request**:
```
FormData with 'photos' and 'metadata' fields
```

**Response**:
```
Binary MP4 file
```

## ⚙️ Configuration

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_MAX_PHOTOS=10
NEXT_PUBLIC_VIDEO_FPS=30
NEXT_PUBLIC_VIDEO_DURATION=5
```

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 📈 Performance

- Image compression before processing
- Lazy loading of components
- Optimized video container creation
- Server-side processing

## 🐛 Troubleshooting

**Issue**: Memory errors with large videos
- Reduce photo resolution or number of photos
- Increase Node.js heap: `NODE_OPTIONS=--max-old-space-size=4096 npm start`

**Issue**: Video not generating
- Check browser console for errors
- Ensure photos are valid image files
- Verify API endpoints are working

## 🚧 Future Enhancements

- [ ] Real MindAR SDK integration
- [ ] Google Vision API integration
- [ ] Advanced video effects and transitions
- [ ] WebGL rendering for AR effects
- [ ] Batch processing with job queue
- [ ] Cloud storage integration (AWS S3)
- [ ] Share & collaborate features
- [ ] FFmpeg.wasm for advanced video encoding

## 📝 License

MIT

## 💬 Support

For issues and questions, open a GitHub issue.

---

Made with ❤️ using Next.js and MindAR
