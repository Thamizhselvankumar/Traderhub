import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import { seedDemoData } from './config/demoData.js'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import schemeRoutes from './routes/schemes.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsPath = path.resolve(__dirname, '..', 'assets')

const app = express()

app.use(cors({ origin: '*', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/assets', express.static(assetsPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.avif')) res.setHeader('Content-Type', 'image/avif')
  },
}))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/schemes', schemeRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/health', (req, res) =>
  res.json({
    status: 'ok',
    message: 'TradeHub API running',
    timestamp: new Date().toISOString(),
  })
)

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  if (process.env.NODE_ENV !== 'production') console.error(err.stack)
  res.status(status).json({ message })
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    return seedDemoData().then((created) => {
      if (created.products || created.users || created.schemes) {
        console.log(`Demo data added: ${created.products} products, ${created.users} users, ${created.schemes} schemes`)
      }
    })
  }
}).then(() => {
  app.listen(PORT, () => {
    console.log(`TradeHub API running: http://localhost:${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
})
