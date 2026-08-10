import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Package, Search, ShoppingCart, SlidersHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import { getProducts } from '../api'
import ProductImage from '../components/ProductImage'
import { useCartStore } from '../store'

const CATEGORIES = ['All', 'Home Care', 'Personal Care', 'Foods', 'Skin Care', 'Hair Care', 'Oral Care', 'Nutrition']

export default function CataloguePage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState('name')
  const addItem = useCartStore((s) => s.addItem)

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['products', { search, category, sortBy }],
    queryFn: () => getProducts({ search, category: category === 'All' ? '' : category, sortBy }),
  })

  const handleAdd = (product) => {
    addItem(product)
    toast.success(`${product.name} added`)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Product Catalogue</h2>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Search products, brands..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="relative">
          <SlidersHorizontal size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="input pl-9 pr-4 appearance-none cursor-pointer"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">Name A-Z</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="card p-3 animate-pulse">
              <div className="h-28 bg-gray-100 rounded-lg mb-3" />
              <div className="h-3 bg-gray-100 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-gray-400">
          <Package size={40} className="mx-auto mb-2 opacity-30" />
          <p className="font-medium text-gray-500">Could not load products</p>
          <p className="text-xs mt-1">{error.message}</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-3">{data?.total || 0} products found</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.products?.map((product) => (
              <div key={product._id} className="card p-3 hover:shadow-md transition-shadow group">
                <ProductImage product={product} className="h-28 mb-3" />
                <p className="text-[10px] text-brand-600 font-bold uppercase tracking-wide">{product.brand}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.unitSize}</p>
                {product.category && (
                  <span className="badge bg-gray-100 text-gray-500 mt-2 inline-block">{product.category}</span>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-800">Rs {product.price}</span>
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-1 text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    <ShoppingCart size={12} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          {data?.products?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Package size={40} className="mx-auto mb-2 opacity-30" />
              <p>No products found</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
