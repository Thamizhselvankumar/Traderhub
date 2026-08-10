import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllOrders, updateOrder } from '../../api'
import toast from 'react-hot-toast'

const STATUSES = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled']
const STATUS_COLOR = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  dispatched: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AdminOrders() {
  const qc = useQueryClient()
  const { data: orders, isLoading } = useQuery({ queryKey: ['allOrders'], queryFn: getAllOrders })

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateOrder(id, { status }),
    onSuccess: () => { qc.invalidateQueries(['allOrders']); toast.success('Order status updated') },
    onError: (err) => toast.error(err.message),
  })

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-5">All Orders</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Order ID', 'Store', 'Items', 'Amount', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
              ))
            ) : orders?.map(o => (
              <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-600">#{o._id.slice(-8).toUpperCase()}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{o.user?.storeName || '—'}</p>
                  <p className="text-xs text-gray-400">{o.user?.city || ''}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{o.items?.length} items</td>
                <td className="px-4 py-3 font-semibold text-gray-800">₹{o.totalAmount}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => mutation.mutate({ id: o._id, status: e.target.value })}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLOR[o.status]}`}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && !orders?.length && (
          <div className="py-12 text-center text-gray-400 text-sm">No orders yet</div>
        )}
      </div>
    </div>
  )
}
