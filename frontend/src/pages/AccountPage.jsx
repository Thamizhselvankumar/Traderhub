import { useAuthStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { Store, Mail, MapPin, Hash, LogOut, ShieldCheck } from 'lucide-react'

export default function AccountPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const fields = [
    { icon: Store,      label: 'Store Name',  value: user?.storeName || '—' },
    { icon: Mail,       label: 'Email',        value: user?.email || '—' },
    { icon: MapPin,     label: 'City',         value: user?.city || '—' },
    { icon: Hash,       label: 'Store ID',     value: user?.storeId || '—' },
    { icon: ShieldCheck,label: 'Role',         value: user?.role === 'admin' ? 'Administrator' : 'Retailer' },
  ]

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Account</h2>

      {/* Avatar card */}
      <div className="card p-6 mb-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || 'R'}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.storeName}</p>
          <span className={`badge mt-1 inline-block ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
            {user?.role === 'admin' ? 'Admin' : 'Retailer'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="card divide-y divide-gray-50">
        {fields.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-5 py-4">
            <Icon size={18} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Admin shortcut */}
      {user?.role === 'admin' && (
        <button
          onClick={() => navigate('/admin')}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
        >
          <ShieldCheck size={16} /> Go to Admin Panel
        </button>
      )}

      <button
        onClick={handleLogout}
        className="w-full mt-3 flex items-center justify-center gap-2 py-3 border border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  )
}
