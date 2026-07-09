import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  // Load MindAR script in head
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Script will be loaded dynamically by ARViewer component
    }
  }, [])

  return <Component {...pageProps} />
}
