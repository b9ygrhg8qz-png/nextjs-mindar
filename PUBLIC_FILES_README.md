# Next.js MindAR Configuration

## Required Files

Place these files in the `public/` directory:

1. **targets.mind** - MindAR image targets file
   - Download from MindAR compiler
   - Contains marker detection data

2. **fire_letter_A.mp4** - Video file to play on marker
   - MP4 format recommended
   - H.264 codec for compatibility
   - Transparent background supported (requires alpha channel)

## How to Create targets.mind

1. Go to https://hiukim.github.io/mind-ar-js-doc/
2. Use the compiler tool
3. Upload your marker images
4. Download the generated targets.mind file
5. Place in `public/` folder

## Video Requirements

- **Format**: MP4 (H.264)
- **Codec**: H.264 video, AAC audio
- **Resolution**: 1280x720 or higher
- **Frame Rate**: 30fps
- **Duration**: Any length
- **Transparency**: Optional (requires alpha channel)

## Troubleshooting

- If targets don't load, verify `targets.mind` path
- If video doesn't play, check file format and CORS headers
- For mobile, ensure camera permission is granted
