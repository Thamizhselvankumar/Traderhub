import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '../../api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { Package, ShoppingCart, Tag, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({ queryKey: ['adminStats'], queryFn: getDashboardStats })

  if (isLoading) return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="card p-5 h-28 animate-pulse bg-gray-100" />)}
      </div>
    </div>
  )

  const cards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Orders',   value: stats?.totalOrders   || 0, icon: ShoppingCart, color: 'bg-green-50 text-green-600' },
    { label: 'Active Schemes', value: stats?.totalSchemes  || 0, icon: Tag, color: 'bg-purple-50 text-purple-600' },
    { label: 'Total Retailers',value: stats?.totalUsers    || 0, icon: Users, color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Dashboard</h2>
        <p className="text-sm text-gray-400">Overview of TradeHub platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-extrabold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-brand-600" />
          <h3 className="font-semibold text-gray-800">Monthly Order Value (₹)</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={stats?.monthlyRevenue || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`₹${v}`, 'Revenue']} />
            <Line type="monotone" dataKey="revenue" stroke="#E31E24" strokeWidth={2} dot={{ r: 4, fill: '#E31E24' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats?.ordersByStatus || []}>
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#E31E24" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <div className="space-y-2">
            {(stats?.recentOrders || []).map(o => (
              <div key={o._id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-gray-700">#{o._id.slice(-6).toUpperCase()}</p>
                  <p className="text-[10px] text-gray-400">{o.user?.storeName || 'Store'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-800">₹{o.totalAmount}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-700'
                    : o.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
