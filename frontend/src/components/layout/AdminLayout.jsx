import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ClipboardList, Tag, ArrowLeft, Users } from 'lucide-react'
import clsx from 'clsx'

const adminNav = [
  { to: '/admin',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products',  icon: Package },
  { to: '/admin/orders',   label: 'Orders',    icon: ClipboardList },
  { to: '/admin/schemes',  label: 'Schemes',   icon: Tag },
  { to: '/admin/users',    label: 'Retailers',  icon: Users },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-60 bg-gray-900 flex flex-col text-white">
        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-xl font-extrabold text-white">
            TradeHub
            <span className="text-xs font-normal ml-2 text-gray-400">Admin</span>
          </h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 pb-4 border-t border-gray-700 pt-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <ArrowLeft size={18} /> Back to Store
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
