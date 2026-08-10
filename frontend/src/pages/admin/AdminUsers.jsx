import { useQuery } from '@tanstack/react-query'
import api from '../../api'
import { Users, Store, MapPin } from 'lucide-react'

export default function AdminUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => api.get('/admin/users'),
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Users size={20} className="text-brand-600" />
        <h2 className="text-xl font-bold text-gray-800">Retailers</h2>
        <span className="badge bg-brand-100 text-brand-700">{users?.length || 0} registered</span>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Retailer', 'Store', 'City', 'Store ID', 'Joined'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={5} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
              ))
            ) : users?.map(u => (
              <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {u.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Store size={13} className="text-gray-400" />
                    {u.storeName || '—'}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={13} className="text-gray-400" />
                    {u.city || '—'}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{u.storeId}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && !users?.length && (
          <div className="py-12 text-center text-gray-400 text-sm">No retailers registered yet</div>
        )}
      </div>
    </div>
  )
}
