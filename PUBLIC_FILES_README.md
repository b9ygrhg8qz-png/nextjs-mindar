# Public Files Required

## Files You Need to Add

Place these files in the `public/` directory:

### 1. targets.mind
- **Source**: MindAR Image Target Compiler
- **URL**: https://hiukim.github.io/mind-ar-js-doc/
- **What it is**: Binary file containing marker detection data
- **How to create**:
  1. Visit the compiler link above
  2. Upload your marker images (jpg/png)
  3. Click "Compile"
  4. Download targets.mind
  5. Save to `public/targets.mind`

### 2. Video Files
- **fire_letter_A.mp4** - Plays when target 0 detected
- **fire_letter_B.mp4** - Plays when target 1 detected
- **fire_letter_C.mp4** - Plays when target 2 detected
- **fire_letter_D.mp4** - Plays when target 3 detected

**Video Requirements**:
- Format: MP4
- Codec: H.264 video + AAC audio
- Resolution: 1280x720 or 1920x1080
- Frame rate: 30fps
- Bitrate: 2-5 Mbps
- Duration: Any length
- Alpha channel: Supported (for transparency)

## Directory Structure After Adding Files

```
public/
├── targets.mind           # ← ADD THIS
├── fire_letter_A.mp4      # ← ADD THIS
├── fire_letter_B.mp4      # ← ADD THIS
├── fire_letter_C.mp4      # ← ADD THIS
└── fire_letter_D.mp4      # ← ADD THIS
```

## How to Reduce to Fewer Targets

If you only want targets 0 and 1:

1. Edit `components/ARViewer.js`:
   ```javascript
   const TARGET_CONFIG = {
     0: { video: '/fire_letter_A.mp4', name: 'Letter A', loop: false },
     1: { video: '/fire_letter_B.mp4', name: 'Letter B', loop: false },
     // Remove targets 2 and 3
   }
   ```

2. In MindAR compiler, upload only your 2 marker images
3. Create targets.mind with just 2 images
4. Only include fire_letter_A.mp4 and fire_letter_B.mp4 in public/

## Video Conversion Examples

### From MP4 to MP4 with optimization
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k output.mp4
```

### Convert to MP4 with alpha channel
```bash
ffmpeg -i input.mov -c:v libx264 -pix_fmt yuva420p -c:a aac output.mp4
```

### Extract specific duration
```bash
ffmpeg -i input.mp4 -t 10 -c copy output.mp4  # First 10 seconds
```

## Testing

1. Ensure all files are in `public/`
2. Run `npm run dev`
3. Open http://localhost:3000
4. Grant camera permission
5. Point camera at markers
6. Videos should play automatically

## Troubleshooting

**404 Error on videos**
- Verify files are in `public/` folder
- Check exact filename matches config
- Reload page (hard refresh: Ctrl+Shift+R)

**targets.mind not loading**
- Check file exists in `public/`
- Verify filename: `targets.mind`
- Check file size > 0 bytes

**Videos not playing**
- Check video format (MP4 H.264)
- Try in Chrome first
- Check browser console for errors

## More Resources

- [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/)
- [FFmpeg Documentation](https://ffmpeg.org/)
- [MP4 Video Specs](https://www.w3.org/TR/mp4/)
