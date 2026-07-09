import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Three.js library */}
        <script src="https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js"></script>
        {/* MindAR library from public folder */}
        <script src="/mindar-image-three.prod.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
