import { Router } from 'express'
import Scheme from '../models/Scheme.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', protect, async (req, res, next) => {
  try {
    const schemes = await Scheme.find({ isActive: true, validTill: { $gte: new Date() } }).sort({ createdAt: -1 })
    res.json(schemes)
  } catch (err) { next(err) }
})

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const s = await Scheme.create(req.body)
    res.status(201).json(s)
  } catch (err) { next(err) }
})

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const s = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!s) return res.status(404).json({ message: 'Scheme not found' })
    res.json(s)
  } catch (err) { next(err) }
})

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    await Scheme.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ message: 'Scheme removed' })
  } catch (err) { next(err) }
})

export default router
