import { Router } from 'express'
import Order from '../models/Order.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

// Place order
router.post('/', protect, async (req, res, next) => {
  try {
    const { items, note, totalAmount } = req.body
    if (!items?.length) return res.status(400).json({ message: 'No items in order' })
    const order = await Order.create({ user: req.user._id, items, note, totalAmount })
    res.status(201).json(order)
  } catch (err) { next(err) }
})

// My orders
router.get('/my', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name brand emoji')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) { next(err) }
})

// All orders (admin)
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name storeName city')
      .populate('items.product', 'name brand')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) { next(err) }
})

// Update order status (admin)
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) { next(err) }
})

export default router
