import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { seedDemoData } from './demoData.js'

dotenv.config()

try {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })

  await seedDemoData({ reset: true })

  console.log('Database seeded successfully')
  console.log('Admin: admin@demo.com / admin123')
  console.log('Retailer: retailer@demo.com / demo123')
} catch (err) {
  console.error('Database seed failed:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
