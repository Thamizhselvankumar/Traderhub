import { Package } from 'lucide-react'
import { useState } from 'react'

export default function ProductImage({ product, className = 'h-28', imgClassName = '' }) {
  const [hasError, setHasError] = useState(false)
  const label = product?.name || 'Product'

  if (!product?.imageUrl || hasError) {
    return (
      <div className={`bg-gray-50 rounded-lg flex items-center justify-center ${className}`}>
        <Package size={32} className="text-gray-300" aria-label={label} />
      </div>
    )
  }

  const envApi = import.meta.env.VITE_API_URL || ''
  const backendBase = envApi.replace(/\/api\/?$/, '')
  const src = product.imageUrl.startsWith('http') || product.imageUrl.startsWith('data:')
    ? product.imageUrl
    : (backendBase ? `${backendBase}${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}` : product.imageUrl)

  return (
    <div className={`bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <img
        src={src}
        alt={label}
        loading="lazy"
        className={`h-full w-full object-contain p-2 ${imgClassName}`}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
