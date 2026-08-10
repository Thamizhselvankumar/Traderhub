import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import ProductImage from './ProductImage'
import { useCartStore } from '../store'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="card p-3 hover:shadow-md transition-shadow group flex flex-col">
      <ProductImage product={product} className="h-28 mb-3" />
      <p className="text-[10px] text-brand-600 font-bold uppercase tracking-wide">{product.brand}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight flex-1">{product.name}</p>
      <p className="text-xs text-gray-400 mt-0.5">{product.unitSize}</p>
      {product.category && (
        <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full inline-block mt-1.5 self-start">
          {product.category}
        </span>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-gray-800">Rs {product.price}</span>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 active:scale-95 transition-all"
        >
          <ShoppingCart size={12} /> Add
        </button>
      </div>
    </div>
  )
}
