import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'

import LoginPage       from './pages/LoginPage'
import HomePage        from './pages/HomePage'
import CataloguePage   from './pages/CataloguePage'
import CartPage        from './pages/CartPage'
import OrdersPage      from './pages/OrdersPage'
import SchemesPage     from './pages/SchemesPage'
import AccountPage     from './pages/AccountPage'
import NotFoundPage    from './pages/NotFoundPage'
import AdminDashboard  from './pages/admin/AdminDashboard'
import AdminProducts   from './pages/admin/AdminProducts'
import AdminOrders     from './pages/admin/AdminOrders'
import AdminSchemes    from './pages/admin/AdminSchemes'
import AdminUsers      from './pages/admin/AdminUsers'

const PrivateRoute = ({ children }) => {
  const token = useAuthStore(s => s.token)
  return token ? children : <Navigate to="/login" replace />
}
const AdminRoute = ({ children }) => {
  const { token, isAdmin } = useAuthStore()
  return token && isAdmin ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<HomePage />} />
        <Route path="catalogue" element={<CataloguePage />} />
        <Route path="cart"      element={<CartPage />} />
        <Route path="orders"    element={<OrdersPage />} />
        <Route path="schemes"   element={<SchemesPage />} />
        <Route path="account"   element={<AccountPage />} />
      </Route>

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index           element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders"   element={<AdminOrders />} />
        <Route path="schemes"  element={<AdminSchemes />} />
        <Route path="users"    element={<AdminUsers />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
