import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">📦</div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-1">Page Not Found</h2>
      <p className="text-gray-400 text-sm mb-8">The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} className="btn-primary flex items-center gap-2">
        <Home size={16} /> Back to Home
      </button>
    </div>
  )
}
