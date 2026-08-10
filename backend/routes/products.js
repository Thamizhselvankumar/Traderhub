import { Router } from 'express'
import Product from '../models/Product.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', protect, async (req, res, next) => {
  try {
    const { search, category, sortBy, limit = 20, page = 1 } = req.query
    const filter = { isActive: true }
    if (category) filter.category = category
    if (search) filter.$text = { $search: search }

    const sort = sortBy === 'price_asc' ? { price: 1 } : sortBy === 'price_desc' ? { price: -1 } : { name: 1 }
    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).limit(Number(limit)).skip(skip),
      Product.countDocuments(filter),
    ])
    res.json({ products, total, page: Number(page) })
  } catch (err) { next(err) }
})

router.get('/:id', protect, async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  } catch (err) { next(err) }
})

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const p = await Product.create(req.body)
    res.status(201).json(p)
  } catch (err) { next(err) }
})

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  } catch (err) { next(err) }
})

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ message: 'Product removed' })
  } catch (err) { next(err) }
})

export default router
