import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,
      setAuth: (user, token) => set({ user, token, isAdmin: user?.role === 'admin' }),
      logout: () => set({ user: null, token: null, isAdmin: false }),
    }),
    { name: 'tradehub-auth' }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1) => {
        const items = get().items
        const existing = items.find(i => i._id === product._id)
        if (existing) {
          set({ items: items.map(i => i._id === product._id ? { ...i, ...product, qty: i.qty + qty } : i) })
        } else {
          set({ items: [...items, { ...product, qty }] })
        }
      },
      updateQty: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter(i => i._id !== id) })
        } else {
          set({ items: get().items.map(i => i._id === id ? { ...i, qty } : i) })
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'tradehub-cart' }
  )
)
