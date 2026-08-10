import mongoose from 'mongoose'

const schemeSchema = new mongoose.Schema({
  brand:       { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  validTill:   { type: Date, required: true },
  minOrder:    { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Scheme', schemeSchema)
