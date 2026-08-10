import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Tag, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { getProducts, getSchemes } from '../api'
import ProductImage from '../components/ProductImage'
import { useAuthStore, useCartStore } from '../store'

const CATEGORIES = [
  { label: 'Home Care', value: 'Home Care' },
  { label: 'Personal Care', value: 'Personal Care' },
  { label: 'Foods & Bev', value: 'Foods' },
  { label: 'Skin Care', value: 'Skin Care' },
  { label: 'Hair Care', value: 'Hair Care' },
  { label: 'Oral Care', value: 'Oral Care' },
  { label: 'Nutrition', value: 'Nutrition' },
]

export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const addItem = useCartStore((s) => s.addItem)

  const { data: products } = useQuery({
    queryKey: ['products', { featured: true }],
    queryFn: () => getProducts({ limit: 8 }),
  })
  const { data: schemes } = useQuery({ queryKey: ['schemes'], queryFn: getSchemes })

  const handleAdd = (product) => {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Welcome back, {user?.name}</h2>
          <p className="text-brand-100 text-sm mt-1">{user?.storeName} - {user?.city || 'India'}</p>
          <Link to="/catalogue" className="mt-3 inline-block bg-white text-brand-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors">
            Browse Catalogue
          </Link>
        </div>
        <Package size={64} className="text-brand-400 hidden md:block" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Schemes', value: schemes?.length || 0, icon: Tag, color: 'text-green-600 bg-green-50' },
          { label: 'Products Available', value: products?.total || 0, icon: Package, color: 'text-blue-600 bg-blue-50' },
          { label: 'This Month Orders', value: '12', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-4">
            <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-2`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Shop by Category</h3>
          <Link to="/catalogue" className="text-sm text-brand-600 font-medium">View all</Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {CATEGORIES.map(({ label, value }) => (
            <Link
              key={value}
              to={`/catalogue?category=${value}`}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all group"
            >
              <Package size={24} className="text-brand-500" />
              <span className="text-[11px] text-center text-gray-600 font-medium leading-tight group-hover:text-brand-600">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {schemes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Active Schemes</h3>
            <Link to="/schemes" className="text-sm text-brand-600 font-medium">View all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {schemes.slice(0, 3).map((scheme, index) => (
              <div key={scheme._id} className={`flex-shrink-0 w-52 rounded-xl p-4 text-white ${['bg-blue-500', 'bg-emerald-500', 'bg-orange-500'][index % 3]}`}>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">{scheme.brand}</span>
                <p className="font-bold mt-2 text-sm">{scheme.title}</p>
                <p className="text-xs opacity-85 mt-0.5">{scheme.description}</p>
                <p className="text-[10px] mt-3 opacity-70">Valid till: {new Date(scheme.validTill).toLocaleDateString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Featured Products</h3>
          <Link to="/catalogue" className="text-sm text-brand-600 font-medium">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products?.products?.map((product) => (
            <div key={product._id} className="card p-3 hover:shadow-md transition-shadow">
              <ProductImage product={product} className="h-28 mb-3" />
              <p className="text-[10px] text-brand-600 font-bold uppercase tracking-wide">{product.brand}</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">{product.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{product.unitSize}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-gray-800">Rs {product.price}</span>
                <button
                  onClick={() => handleAdd(product)}
                  className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors"
                >
                  <ShoppingCart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
