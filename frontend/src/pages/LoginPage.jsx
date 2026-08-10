import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { login, register as registerUser } from '../api'
import { useAuthStore } from '../store'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.setAuth)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const fn = isRegister ? registerUser : login
      const res = await fn(data)
      setAuth(res.user, res.token)
      toast.success(`Welcome, ${res.user.name}!`)
      navigate(res.user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-brand-600">TradeHub</h1>
          <p className="text-gray-500 text-sm mt-1">Retailer Ordering Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input className="input mt-1" placeholder="Ramesh Sharma"
                  {...register('name', { required: 'Name required' })} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Store Name</label>
                <input className="input mt-1" placeholder="Sharma General Store"
                  {...register('storeName', { required: 'Store name required' })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">City</label>
                <input className="input mt-1" placeholder="Delhi"
                  {...register('city')} />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input className="input mt-1" type="email" placeholder="retailer@email.com"
              {...register('email', { required: 'Email required' })} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input className="input mt-1" type="password" placeholder="••••••••"
              {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 mt-2 disabled:opacity-60">
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)}
            className="text-brand-600 font-semibold hover:underline">
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>

        {/* Demo credentials */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500 text-center">
          <p className="font-semibold text-gray-600 mb-1">Demo credentials</p>
          <p>Retailer: retailer@demo.com / demo123</p>
          <p>Admin: admin@demo.com / admin123</p>
        </div>
      </div>
    </div>
  )
}
