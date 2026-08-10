import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Home, Grid, ClipboardList, Tag, LogOut, User } from 'lucide-react'
import { useAuthStore, useCartStore } from '../../store'
import clsx from 'clsx'

const navItems = [
  { to: '/',          label: 'Home',      icon: Home },
  { to: '/catalogue', label: 'Catalogue', icon: Grid },
  { to: '/cart',      label: 'Cart',      icon: ShoppingCart },
  { to: '/orders',    label: 'My Orders', icon: ClipboardList },
  { to: '/schemes',   label: 'Schemes',   icon: Tag },
  { to: '/account',   label: 'Account',   icon: User },
]

export default function Layout() {
  const { user, logout } = useAuthStore()
  const count = useCartStore(s => s.count())
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-brand-600">TradeHub</h1>
          <p className="text-xs text-gray-400 mt-0.5">Retailer Portal</p>
        </div>

        {/* Store info */}
        <div className="px-4 py-3 mx-3 mt-3 bg-brand-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.storeName?.[0] || 'R'}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800 truncate">{user?.storeName || 'My Store'}</p>
              <p className="text-[10px] text-gray-500">{user?.storeId || 'ID: —'}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all"
            >
              <User size={18} /> Admin Panel
            </button>
          )}
          <button
            onClick={() => { logout(); navigate('/login') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Welcome back, {user?.name || 'Retailer'}</h2>
            <p className="text-xs text-gray-400">Manage your orders & catalogue</p>
          </div>
          <NavLink to="/cart" className="relative">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors">
              <ShoppingCart size={20} className="text-brand-600" />
            </div>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </NavLink>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
