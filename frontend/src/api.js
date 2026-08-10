import axios from 'axios'

const envApi = import.meta.env.VITE_API_URL
const baseURL = envApi ? (envApi.endsWith('/api') ? envApi : `${envApi.replace(/\/$/, '')}/api`) : '/api'

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('tradehub-auth') || '{}')
  const token = auth?.state?.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg = err.response?.data?.message || 'Something went wrong'
    if (err.response?.status === 401) {
      localStorage.removeItem('tradehub-auth')
      if (window.location.pathname !== '/login') window.location.href = '/login'
    }
    return Promise.reject(new Error(msg))
  }
)

export default api

// --- Products ---
export const getProducts = (params) => api.get('/products', { params })
export const getProduct  = (id)     => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id)   => api.delete(`/products/${id}`)

// --- Orders ---
export const placeOrder   = (data) => api.post('/orders', data)
export const getMyOrders  = ()     => api.get('/orders/my')
export const getAllOrders  = ()     => api.get('/orders')
export const updateOrder  = (id, data) => api.put(`/orders/${id}`, data)

// --- Schemes ---
export const getSchemes   = ()     => api.get('/schemes')
export const createScheme = (data) => api.post('/schemes', data)
export const updateScheme = (id, data) => api.put(`/schemes/${id}`, data)
export const deleteScheme = (id)   => api.delete(`/schemes/${id}`)

// --- Auth ---
export const login    = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)

// --- Admin ---
export const getDashboardStats = () => api.get('/admin/stats')
