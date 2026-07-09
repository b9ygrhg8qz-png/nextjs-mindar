import dynamic from 'next/dynamic'

const ARViewer = dynamic(() => import('../components/ARViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
        <p className="text-lg">Initializing MindAR...</p>
        <p className="text-sm text-gray-400 mt-2">Loading AR engine and camera...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return <ARViewer />
}
