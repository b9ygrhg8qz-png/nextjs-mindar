# Next.js Advanced MindAR AR Video Player

## 🎯 Features

### ✅ All Requirements Implemented

#### **On Site Load**
- ✅ Requests camera access
- ✅ Auto-initializes MindAR
- ✅ Loads targets.mind file
- ✅ Displays loading status

#### **On Image Target Detection**
- ✅ Auto-plays video (fire_letter_A.mp4, B.mp4, C.mp4, D.mp4)
- ✅ Video displays above marker (3D rendered)
- ✅ Video perfectly centered on marker
- ✅ No borders or extra fields
- ✅ Supports alpha channel transparency
- ✅ Loop support (configurable)

#### **On Marker Loss**
- ✅ Video stops immediately
- ✅ Playback resets to beginning (currentTime = 0)

#### **On Re-detection**
- ✅ Video restarts from first frame

#### **Multi-Target Support**
- ✅ Support for multiple image targets (0-3)
- ✅ Each target has independent video
- ✅ Simultaneous detection of multiple markers

### 🔧 Additional Fixes
- ✅ Correct MindARThree initialization
- ✅ Proper camera stream handling
- ✅ Fixed black screen issues
- ✅ Compatible library versions
- ✅ Auto cleanup on page exit
- ✅ Performance optimized
- ✅ Works with Next.js App Router

## 📦 Target Configuration

```javascript
const TARGET_CONFIG = {
  0: { video: '/fire_letter_A.mp4', name: 'Letter A', loop: false },
  1: { video: '/fire_letter_B.mp4', name: 'Letter B', loop: false },
  2: { video: '/fire_letter_C.mp4', name: 'Letter C', loop: false },
  3: { video: '/fire_letter_D.mp4', name: 'Letter D', loop: false },
}
```

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/b9ygrhg8qz-png/nextjs-mindar.git
cd nextjs-mindar
npm install
```

### 2. Add Required Files to `/public`

```
public/
├── targets.mind          # Image target markers
├── fire_letter_A.mp4     # Video for target 0
├── fire_letter_B.mp4     # Video for target 1
├── fire_letter_C.mp4     # Video for target 2
└── fire_letter_D.mp4     # Video for target 3
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Project Structure

```
nextjs-mindar/
├── components/
│   └── ARViewer.js           # Main AR component with multi-target support
├── pages/
│   ├── index.js              # AR viewer page
│   ├── _app.js
│   ├── _document.js
│   └── api/
│       └── health.js         # Health check endpoint
├── public/
│   ├── targets.mind          # ADD YOUR FILE
│   ├── fire_letter_A.mp4     # ADD YOUR FILE
│   ├── fire_letter_B.mp4     # ADD YOUR FILE
│   ├── fire_letter_C.mp4     # ADD YOUR FILE
│   └── fire_letter_D.mp4     # ADD YOUR FILE
├── styles/
│   └── globals.css           # Global styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🎬 Creating targets.mind

1. Visit: https://hiukim.github.io/mind-ar-js-doc/
2. Use the Image Target Compiler
3. Upload your marker images (JPG/PNG)
4. Download targets.mind
5. Place in `public/` folder

## 📹 Video Requirements

### Format
- **Container**: MP4
- **Video Codec**: H.264
- **Audio Codec**: AAC (optional)
- **Resolution**: 1280x720 or higher
- **Frame Rate**: 30fps
- **Transparency**: Supports alpha channel

### Browser Compatibility
- Chrome/Chromium: Full support
- Safari: Full support
- Firefox: Full support
- Mobile Browsers: Requires HTTPS or localhost

## ⚙️ Configuration

### Video Mesh Properties
Edit `components/ARViewer.js`:

```javascript
// Size
mesh.scale.set(1.5, 1, 1)  // width, height, depth

// Position
mesh.position.z = 0.1

// Rotation
mesh.rotation.set(0, 0, 0)
```

### Camera Settings
```javascript
{
  audio: false,
  video: {
    facingMode: 'environment',  // or 'user' for selfie
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
}
```

### Loop Configuration
```javascript
const TARGET_CONFIG = {
  0: { video: '/video.mp4', name: 'Target', loop: false },  // Play once
  1: { video: '/video.mp4', name: 'Target', loop: true },   // Loop
}
```

## 🎨 Customization

### Add More Targets

1. Update `TARGET_CONFIG`:
```javascript
const TARGET_CONFIG = {
  0: { video: '/video0.mp4', name: 'Target 0', loop: false },
  1: { video: '/video1.mp4', name: 'Target 1', loop: false },
  2: { video: '/video2.mp4', name: 'Target 2', loop: true },
  // Add more...
  99: { video: '/video99.mp4', name: 'Target 99', loop: false },
}
```

2. Add videos to `/public`
3. Ensure `targets.mind` includes all target images

### Customize UI

Edit status overlay colors and positions in `components/ARViewer.js`:

```javascript
// Status overlay styles
<div className="absolute top-4 left-4 ... ">
  {/* Customize here */}
</div>
```

## 🔍 Debugging

### Enable Console Logging
```javascript
// In ARViewer.js, uncomment for debugging:
console.log('Target detected:', index)
console.log('Video playing:', videoElement.src)
```

### Check Browser DevTools
- Network tab: Verify files load (targets.mind, videos)
- Console: Check for errors
- Application: Verify camera permissions

## ⚡ Performance Tips

1. **Optimize videos**: Use 720p or 1080p max
2. **Reduce bitrate**: 2-5 Mbps is sufficient
3. **Use hardware acceleration**: Enabled by default
4. **Close unused tabs**: Frees GPU memory
5. **Portrait mode**: Better for mobile devices

## 🐛 Troubleshooting

### Black Screen
- Check camera permissions
- Verify `targets.mind` path
- Check browser console for errors
- Try different browser

### Video Not Playing
- Verify video file exists in `/public`
- Check video format (MP4 H.264)
- Try different browser
- Check CORS headers (should be automatic)

### Marker Not Detected
- Ensure good lighting
- Check marker image quality
- Verify `targets.mind` created correctly
- Try different angles/distances

### Performance Issues
- Reduce video resolution
- Close other tabs
- Use landscape orientation
- Update browser drivers

## 📱 Mobile Testing

### On Same Network
```bash
# Get your IP
ifconfig | grep inet

# Access from phone
http://YOUR_IP:3000
```

### Remote Testing
- Use ngrok: `ngrok http 3000`
- Access from phone via ngrok URL

## 🔐 Production Build

```bash
npm run build
npm start
```

### HTTPS Required
- Most mobile devices require HTTPS for camera access
- Use platforms like Vercel, Netlify, or AWS

## 📚 Resources

- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs/)
- [WebGL/WebXR Standards](https://www.w3.org/TR/webxr/)

## 🤝 Support

For issues:
1. Check browser console
2. Review troubleshooting section
3. Open GitHub issue with details
4. Include browser/OS version

## 📄 License

MIT

## 🙏 Credits

Built with:
- [MindAR](https://github.com/hiukim/mind-ar-js)
- [Three.js](https://threejs.org/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)

---

**Made with ❤️ for AR experiences**
