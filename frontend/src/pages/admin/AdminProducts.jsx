import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit2, Plus, Trash2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../api'
import ProductImage from '../../components/ProductImage'

const CATEGORIES = ['Home Care', 'Personal Care', 'Foods', 'Skin Care', 'Hair Care', 'Oral Care', 'Nutrition']

function ProductModal({ product, onClose }) {
  const qc = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product || { category: 'Home Care', imageUrl: '' },
  })

  const mutation = useMutation({
    mutationFn: (data) => product ? updateProduct(product._id, data) : createProduct(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      toast.success(product ? 'Product updated' : 'Product created')
      onClose()
    },
    onError: (err) => toast.error(err.message),
  })

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-800">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Brand *</label>
              <input className="input mt-1" {...register('brand', { required: true })} placeholder="Surf Excel" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Category *</label>
              <select className="input mt-1" {...register('category', { required: true })}>
                {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Product Name *</label>
            <input className="input mt-1" {...register('name', { required: true })} placeholder="Matic Liquid Detergent" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Image URL</label>
            <input className="input mt-1" {...register('imageUrl')} placeholder="https://example.com/product.png" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Price (Rs) *</label>
              <input className="input mt-1" type="number" {...register('price', { required: true, min: 1 })} placeholder="220" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Unit Size</label>
              <input className="input mt-1" {...register('unitSize')} placeholder="1 kg" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Stock Quantity</label>
            <input className="input mt-1" type="number" {...register('stock')} placeholder="100" />
          </div>
          {Object.keys(errors).length > 0 && <p className="text-xs text-red-500">Please fill all required fields.</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary flex-1">
              {mutation.isPending ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const [modal, setModal] = useState(null)
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['products', {}],
    queryFn: () => getProducts({ limit: 100 }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted')
    },
    onError: (err) => toast.error(err.message),
  })

  return (
    <div>
      {modal !== undefined && modal !== false && (
        <ProductModal product={modal === true ? null : modal} onClose={() => setModal(false)} />
      )}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">Products</h2>
        <button onClick={() => setModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <tr key={index}><td colSpan={5} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
              ))
            ) : data?.products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProductImage product={product} className="h-12 w-12 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.brand} - {product.unitSize}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><span className="badge bg-gray-100 text-gray-600">{product.category}</span></td>
                <td className="px-4 py-3 font-semibold text-gray-800">Rs {product.price}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${product.stock > 20 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
                    {product.stock ?? '-'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setModal(product)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => { if (confirm('Delete this product?')) deleteMutation.mutate(product._id) }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
