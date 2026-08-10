import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty:     { type: Number, required: true, min: 1 },
  price:   { type: Number, required: true },
})

const orderSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:       [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status:      { type: String, enum: ['pending','confirmed','dispatched','delivered','cancelled'], default: 'pending' },
  note:        { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
