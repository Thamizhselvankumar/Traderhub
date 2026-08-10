import { Router } from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Scheme from '../models/Scheme.js'
import User from '../models/User.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/users', protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({ role: 'retailer' }).select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) { next(err) }
})

router.get('/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const [totalProducts, totalOrders, totalSchemes, totalUsers, recentOrders, ordersByStatusRaw] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Scheme.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'retailer' }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'storeName city'),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ])

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const revenueRaw = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, status: { $ne: 'cancelled' } } },
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, revenue: { $sum: '$totalAmount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])

    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const monthlyRevenue = revenueRaw.map(r => ({ month: MONTHS[r._id.month - 1], revenue: r.revenue }))
    const ordersByStatus = ordersByStatusRaw.map(r => ({ status: r._id, count: r.count }))

    res.json({ totalProducts, totalOrders, totalSchemes, totalUsers, recentOrders, monthlyRevenue, ordersByStatus })
  } catch (err) { next(err) }
})

export default router
