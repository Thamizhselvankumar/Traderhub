import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getProducts, placeOrder } from '../api'
import ProductImage from '../components/ProductImage'
import { useCartStore } from '../store'

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total, count } = useCartStore()
  const [note, setNote] = useState('')
  const navigate = useNavigate()

  const { data: catalog } = useQuery({
    queryKey: ['cart-products'],
    queryFn: () => getProducts({ limit: 100 }),
    enabled: items.length > 0,
  })
  const productById = new Map((catalog?.products || []).map((product) => [product._id, product]))

  const mutation = useMutation({
    mutationFn: () => placeOrder({
      items: items.map((item) => ({ product: item._id, qty: item.qty, price: item.price })),
      note,
      totalAmount: total(),
    }),
    onSuccess: () => {
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/orders')
    },
    onError: (err) => toast.error(err.message),
  })

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <ShoppingCart size={56} className="mx-auto text-gray-200 mb-4" />
        <h3 className="text-lg font-semibold text-gray-500">Your cart is empty</h3>
        <p className="text-gray-400 text-sm mt-1">Browse the catalogue and add products</p>
        <button onClick={() => navigate('/catalogue')} className="btn-primary mt-5">Browse Catalogue</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Cart ({count()} items)</h2>

      <div className="space-y-3 mb-6">
        {items.map((item) => {
          const catalogProduct = productById.get(item._id)
          const displayItem = {
            ...item,
            brand: catalogProduct?.brand || item.brand,
            name: catalogProduct?.name || item.name,
            unitSize: catalogProduct?.unitSize || item.unitSize,
            imageUrl: item.imageUrl || catalogProduct?.imageUrl,
          }

          return (
            <div key={item._id} className="card p-4 flex items-center gap-4">
              <ProductImage
                product={displayItem}
                className="w-14 h-14 flex-shrink-0"
                imgClassName="p-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-brand-600 font-bold uppercase">{displayItem.brand}</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{displayItem.name}</p>
                <p className="text-xs text-gray-400">{displayItem.unitSize}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item._id, item.qty - 1)}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, item.qty + 1)}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={12} />
                </button>
              </div>
              <div className="text-right w-20">
                <p className="font-bold text-gray-800">Rs {item.price * item.qty}</p>
                <p className="text-xs text-gray-400">Rs {item.price}/unit</p>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        })}
      </div>

      <div className="card p-4 mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Order note (optional)</label>
        <textarea
          rows={2}
          className="input resize-none"
          placeholder="Any special instructions..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      <div className="card p-4 mb-5">
        <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({count()} items)</span>
            <span>Rs {total()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery charges</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800">
            <span>Total Amount</span>
            <span>Rs {total()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="btn-primary w-full py-3 text-base disabled:opacity-60"
      >
        {mutation.isPending ? 'Placing Order...' : `Place Order - Rs ${total()}`}
      </button>
    </div>
  )
}
