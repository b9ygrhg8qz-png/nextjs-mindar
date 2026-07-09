# Next.js MindAR AR Video Player - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Prepare Files

You need to create/add two types of files:

#### A. targets.mind
- Binary file with marker data
- Created using MindAR compiler: https://hiukim.github.io/mind-ar-js-doc/
- Upload your marker image(s) to compiler
- Download and save to `public/targets.mind`

#### B. Video Files
- MP4 format with H.264 codec
- Save to `public/`:
  - `fire_letter_A.mp4` (for target 0)
  - `fire_letter_B.mp4` (for target 1)
  - `fire_letter_C.mp4` (for target 2)
  - `fire_letter_D.mp4` (for target 3)

### 3. Run
```bash
npm run dev
```

Open http://localhost:3000

## Features Implemented

✅ Multi-target support (targets 0-3 configurable)
✅ Auto camera permission request
✅ Auto MindAR initialization
✅ Auto video playback on marker detection
✅ Video centered on marker
✅ No borders or frames
✅ Transparent background support
✅ Auto pause on marker loss
✅ Auto restart on re-detection
✅ Loop mode configuration
✅ Real-time status display
✅ Performance optimized
✅ Full resource cleanup
✅ Mobile compatible

## Configuration

### Edit Targets

In `components/ARViewer.js`, modify:

```javascript
const TARGET_CONFIG = {
  0: { video: '/fire_letter_A.mp4', name: 'Letter A', loop: false },
  1: { video: '/fire_letter_B.mp4', name: 'Letter B', loop: false },
  2: { video: '/fire_letter_C.mp4', name: 'Letter C', loop: false },
  3: { video: '/fire_letter_D.mp4', name: 'Letter D', loop: false },
}
```

- `video`: Path to MP4 file
- `name`: Display name for status
- `loop`: true = loop video, false = play once

### Edit Video Mesh Size

In `components/ARViewer.js`, find:

```javascript
mesh.scale.set(1.5, 1, 1)  // width, height, depth
```

- First value: horizontal scale (1.5 = 50% larger)
- Second value: vertical scale
- Third value: depth (usually 1)

## Deployment

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`

## Mobile Testing

### Local Network
```bash
# Find your IP
ifconfig | grep "inet "

# Access from phone: http://YOUR_IP:3000
```

### Note
- HTTPS required for production camera access
- Localhost works fine for development
- Use landscape orientation for better experience

## Troubleshooting

### Black screen
- Check camera permissions
- Verify targets.mind exists in public/
- Check browser console (F12)

### No video
- Verify MP4 file exists in public/
- Check exact filename in TARGET_CONFIG
- Try different browser

### Marker not detected
- Ensure good lighting
- Check marker image quality
- Try different angles
- Verify targets.mind created correctly

## Need Help?

Check:
1. Browser console (F12 → Console tab)
2. Network tab (verify files load)
3. README.md for detailed docs
4. PUBLIC_FILES_README.md for file requirements

## Next Steps

1. ✅ Create targets.mind
2. ✅ Add video files to public/
3. ✅ Configure TARGET_CONFIG if needed
4. ✅ Run `npm run dev`
5. ✅ Test with your marker

Enjoy your AR experience! 🚀
