import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, storeName, city } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password required' })
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' })
    const user = await User.create({ name, email, password, storeName, city })
    res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email, storeName: user.storeName, storeId: user.storeId, city: user.city, role: user.role }, token: signToken(user._id) })
  } catch (err) { next(err) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' })
    res.json({ user: { _id: user._id, name: user.name, email: user.email, storeName: user.storeName, storeId: user.storeId, city: user.city, role: user.role }, token: signToken(user._id) })
  } catch (err) { next(err) }
})

export default router
