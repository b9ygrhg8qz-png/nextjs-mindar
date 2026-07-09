# Next.js MindAR AR Video Player

A full-featured Next.js application with MindAR for Augmented Reality marker detection and video playback.

## ✨ Features

### AR Video Playback
- 🎬 **Auto-play Video** - Plays when marker is detected
- 🎯 **Centered Rendering** - Video perfectly centered on marker
- 📏 **No Borders** - Clean, borderless video mesh
- 🔄 **Loop Support** - Restarts on marker re-detection
- ⏸️ **Auto-pause** - Stops when marker is lost
- 🎥 **Transparent Background** - Supports alpha channels

### Photo Processing
- 📷 **Batch Upload** - Process up to 10 photos
- 🔍 **Detection** - Analyze images for objects
- 📊 **Results** - View detection statistics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **AR**: MindAR (Image tracking)
- **3D Graphics**: Three.js
- **Language**: JavaScript
- **Styling**: Tailwind CSS

## 📋 Requirements

### Files needed in `/public`:
```
public/
├── targets.mind              # MindAR target file
└── fire_letter_A.mp4        # Video to play on marker
```

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/b9ygrhg8qz-png/nextjs-mindar.git
cd nextjs-mindar

# Install dependencies
npm install

# Add your files:
# 1. Place targets.mind in public/
# 2. Place fire_letter_A.mp4 in public/

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### AR Mode (Default)
1. **Camera Permission** - Grant access when prompted
2. **Point Camera** - Aim at your image marker
3. **Auto-play** - Video starts automatically
4. **Marker Lost** - Video pauses on detection loss
5. **Re-detect** - Video restarts from beginning

### Photo Processing
Navigate to `/photos` to process images.

## 📂 Project Structure

```
├── pages/
│   ├── index.js                  # AR mode
│   ├── photos.js                 # Photo processor
│   ├── _app.js
│   ├── _document.js
│   └── api/
│       └── process-photos.js     # Photo processing API
├── components/
│   ├── ARViewer.js              # Main AR component
│   └── PhotoProcessor.js         # Photo processor component
├── public/
│   ├── targets.mind             # Image targets
│   └── fire_letter_A.mp4        # AR video
├── styles/
│   └── globals.css
└── package.json
```

## 🔧 Configuration

### Video Properties
Edit `components/ARViewer.js`:
```javascript
// Video scale
mesh.scale.set(1.5, 1, 1)  // width, height, depth

// Video position
mesh.position.set(0, 0, 0)  // x, y, z
```

### Camera Settings
Edit `components/ARViewer.js`:
```javascript
{
  audio: false,
  video: {
    facingMode: 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
}
```

## 📊 API Routes

### POST /api/process-photos
Process uploaded photos.

**Request**:
```
FormData with 'photos' field
```

**Response**:
```json
{
  "success": true,
  "totalPhotos": 5,
  "detectedObjects": 23,
  "photos": [
    {
      "filename": "photo.jpg",
      "detected": 5,
      "confidence": "0.92"
    }
  ],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🎨 Customization

### Video Mesh Properties
- **Size**: Adjust `mesh.scale.set()`
- **Position**: Adjust `mesh.position.set()`
- **Rotation**: Adjust `mesh.rotation.set()`
- **Transparency**: Edit material properties

### Status Display
Edit `components/ARViewer.js` status overlay colors and position.

## 🔍 How MindAR Works

1. **Load Targets** - `targets.mind` contains image target data
2. **Camera Feed** - Continuous video stream from device camera
3. **Detection** - Real-time matching against target images
4. **Anchor** - 3D space positioned on detected marker
5. **Rendering** - Three.js renders video mesh to canvas

## ⚠️ Troubleshooting

**Video not playing**
- Check browser console for errors
- Ensure video file is in `/public/`
- Verify video format (MP4 recommended)
- Check CORS settings

**Marker not detected**
- Ensure good lighting
- Check `targets.mind` file integrity
- Try different angles/distances
- Verify camera permissions

**Performance issues**
- Reduce video resolution
- Check device CPU/GPU usage
- Close other tabs
- Use landscape orientation

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📚 Resources

- [MindAR Docs](https://hiukim.github.io/mind-ar-js-doc/)
- [Three.js Docs](https://threejs.org/docs/)
- [Next.js Docs](https://nextjs.org/docs)

## 📄 License

MIT

## 👤 Author

Created with ❤️ for AR applications
