import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Load MindAR from CDN with UMD bundle */}
        <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.umd.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
