import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, minlength: 6 },
  storeName: { type: String, default: '' },
  storeId:   { type: String },
  city:      { type: String, default: '' },
  phone:     { type: String, default: '' },
  role:      { type: String, enum: ['retailer', 'admin'], default: 'retailer' },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  if (!this.storeId) this.storeId = 'SH' + Math.floor(100000 + Math.random() * 900000)
  next()
})

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
