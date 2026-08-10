import { useQuery } from '@tanstack/react-query'
import { getMyOrders } from '../api'
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'

const STATUS_CONFIG = {
  pending:    { label: 'Pending',     icon: Clock,        color: 'text-yellow-600 bg-yellow-50' },
  confirmed:  { label: 'Confirmed',   icon: CheckCircle,  color: 'text-blue-600 bg-blue-50' },
  dispatched: { label: 'Dispatched',  icon: Truck,        color: 'text-purple-600 bg-purple-50' },
  delivered:  { label: 'Delivered',   icon: CheckCircle,  color: 'text-green-600 bg-green-50' },
  cancelled:  { label: 'Cancelled',   icon: XCircle,      color: 'text-red-500 bg-red-50' },
}

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery({ queryKey: ['myOrders'], queryFn: getMyOrders })

  if (isLoading) return (
    <div className="space-y-3">
      {[1,2,3].map(i => <div key={i} className="card p-5 animate-pulse h-28" />)}
    </div>
  )

  if (!orders?.length) return (
    <div className="text-center py-24">
      <Package size={56} className="mx-auto text-gray-200 mb-4" />
      <h3 className="text-lg font-semibold text-gray-500">No orders yet</h3>
      <p className="text-gray-400 text-sm">Your placed orders will appear here</p>
    </div>
  )

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">My Orders</h2>
      <div className="space-y-4">
        {orders.map(order => {
          const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
          const Icon = cfg.icon
          return (
            <div key={order._id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className={`badge flex items-center gap-1 ${cfg.color}`}>
                  <Icon size={12} /> {cfg.label}
                </span>
              </div>

              <div className="border-t border-gray-50 pt-3">
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product?.name || 'Product'} <span className="text-gray-400">×{item.qty}</span></span>
                      <span className="text-gray-700">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-400">+{order.items.length - 3} more items</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">{order.items.length} items</span>
                <span className="font-bold text-gray-800">₹{order.totalAmount}</span>
              </div>

              {order.note && (
                <p className="mt-2 text-xs text-gray-400 italic">Note: {order.note}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
