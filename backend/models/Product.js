import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Home Care', 'Personal Care', 'Foods', 'Skin Care', 'Hair Care', 'Oral Care', 'Nutrition'],
  },
  price: { type: Number, required: true, min: 0 },
  unitSize: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  emoji: { type: String, default: '' },
  stock: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

productSchema.index({ name: 'text', brand: 'text' })

export default mongoose.model('Product', productSchema)
