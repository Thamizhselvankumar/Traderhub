import User from '../models/User.js'
import Product from '../models/Product.js'
import Scheme from '../models/Scheme.js'

const productImage = (fileName) => `/assets/${fileName}`

const products = [
  { brand: 'Surf Excel', name: 'Matic Liquid Detergent', category: 'Home Care', price: 220, unitSize: '1 kg', stock: 150, imageUrl: productImage('surf-excel-matic-liquid-detergent.avif') },
  { brand: 'Vim', name: 'Dishwash Liquid Bar', category: 'Home Care', price: 30, unitSize: '155 g', stock: 300, imageUrl: productImage('vim-dishwash-liquid.avif') },
  { brand: 'Domex', name: 'Ultra Thick Bleach', category: 'Home Care', price: 85, unitSize: '500 ml', stock: 200, imageUrl: productImage('domex-disinfectant-toilet-cleaner.avif') },
  { brand: 'Dove', name: 'Scalp Hair Therapy Serum', category: 'Hair Care', price: 499, unitSize: '50 ml', stock: 55, imageUrl: productImage('dove-scalp-hair-therapy-serum.avif') },
  { brand: 'Clinic Plus', name: 'Strength & Shine Shampoo', category: 'Hair Care', price: 149, unitSize: '340 ml', stock: 180, imageUrl: productImage('clinic-plus-strong-long-shampoo.avif') },
  { brand: 'Lifebuoy', name: 'Lemon Fresh Bodywash', category: 'Personal Care', price: 180, unitSize: '250 ml', stock: 170, imageUrl: productImage('lifebuoy-lemon-fresh-bodywash.avif') },
  { brand: 'Lux', name: 'Soft Glow Beauty Bar', category: 'Personal Care', price: 80, unitSize: '3 x 100 g', stock: 350, imageUrl: productImage('lux-radiant-glow-soap.avif') },
  { brand: "Pond's", name: 'Hydra Miracle Gel Facewash', category: 'Skin Care', price: 175, unitSize: '100 g', stock: 90, imageUrl: productImage('ponds-hydra-miracle-gel-facewash.avif') },
  { brand: 'Vaseline', name: 'Gluta-Hya Dewy Radiance Serum', category: 'Skin Care', price: 299, unitSize: '100 ml', stock: 130, imageUrl: productImage('vaseline-gluta-hya-dewy-radiance-serum.avif') },
  { brand: 'Pepsodent', name: 'Germicheck Toothpaste', category: 'Oral Care', price: 89, unitSize: '150 g', stock: 250, imageUrl: productImage('pepsodent-germicheck-toothpaste.avif') },
  { brand: 'Close Up', name: 'Red Hot Toothpaste', category: 'Oral Care', price: 95, unitSize: '150 g', stock: 220, imageUrl: productImage('closeup-white-now-toothpaste.avif') },
  { brand: 'Red Label', name: 'Natural Care Tea', category: 'Foods', price: 235, unitSize: '500 g', stock: 100, imageUrl: productImage('red-label-tea.avif') },
  { brand: 'Brooke Bond', name: '3 Roses Tea Dust', category: 'Foods', price: 180, unitSize: '500 g', stock: 110, imageUrl: productImage('brooke-bond-3-roses-tea.avif') },
  { brand: 'Horlicks', name: 'Classic Malt Drink', category: 'Nutrition', price: 289, unitSize: '500 g', stock: 80, imageUrl: productImage('horlicks-super-food-malt-drink.avif') },
  { brand: 'Boost', name: 'Chocolate Energy Drink', category: 'Nutrition', price: 260, unitSize: '500 g', stock: 70, imageUrl: productImage('boost-stamina-malt-drink.avif') },
  { brand: 'Knorr', name: 'Chicken Noodle Soup', category: 'Foods', price: 45, unitSize: '43 g', stock: 200, imageUrl: productImage('knorr-tomato-chatpata-cup-a-soup.avif') },
  { brand: 'Active Wheel', name: '2 in 1 Detergent Powder', category: 'Home Care', price: 115, unitSize: '1 kg', stock: 260, imageUrl: productImage('active-wheel-2in1-detergent-powder.avif') },
  { brand: 'Axe', name: 'Dark Temptation Deodorant', category: 'Personal Care', price: 210, unitSize: '150 ml', stock: 140, imageUrl: productImage('axe-dark-temptation-deodorant.avif') },
  { brand: 'Brooke Bond', name: 'Taaza Tea', category: 'Foods', price: 165, unitSize: '500 g', stock: 120, imageUrl: productImage('brooke-bond-taaza-tea.avif') },
  { brand: 'Bru', name: 'Instant Coffee', category: 'Foods', price: 190, unitSize: '100 g', stock: 90, imageUrl: productImage('bru-instant-coffee.avif') },
  { brand: 'Cif', name: 'Nature Protect Surface Cleaner', category: 'Home Care', price: 399, unitSize: '5 L', stock: 45, imageUrl: productImage('cif-nature-protect-surface-cleaner.avif') },
  { brand: 'Comfort', name: 'Fabric Conditioner', category: 'Home Care', price: 235, unitSize: '860 ml', stock: 110, imageUrl: productImage('comfort-fabric-conditioner.avif') },
  { brand: 'Elle 18', name: 'Color Pops Silk Lipstick', category: 'Skin Care', price: 120, unitSize: '4.3 g', stock: 160, imageUrl: productImage('elle-18-color-pops-silk-lipstick.avif') },
  { brand: 'Glow & Lovely', name: 'Bright Cream', category: 'Skin Care', price: 99, unitSize: '50 g', stock: 190, imageUrl: productImage('glow-lovely-bright-cream.avif') },
  { brand: 'Hamam', name: 'Neem & Tulsi Soap', category: 'Personal Care', price: 45, unitSize: '150 g', stock: 320, imageUrl: productImage('hamam-neem-tulsi-soap.avif') },
  { brand: "Hellmann's", name: 'Real Mayonnaise', category: 'Foods', price: 175, unitSize: '400 g', stock: 75, imageUrl: productImage('hellmanns-real-mayonnaise.avif') },
  { brand: 'Horlicks', name: 'Diabetes Plus', category: 'Nutrition', price: 445, unitSize: '400 g', stock: 60, imageUrl: productImage('horlicks-diabetes-plus.avif') },
  { brand: 'Horlicks', name: 'Junior', category: 'Nutrition', price: 315, unitSize: '500 g', stock: 82, imageUrl: productImage('horlicks-junior.avif') },
  { brand: 'Horlicks', name: 'Lite', category: 'Nutrition', price: 325, unitSize: '500 g', stock: 74, imageUrl: productImage('horlicks-lite.avif') },
  { brand: 'Horlicks', name: "Mother's Plus Vanilla", category: 'Nutrition', price: 515, unitSize: '500 g', stock: 42, imageUrl: productImage('horlicks-mothers-plus-vanilla.avif') },
  { brand: 'Horlicks', name: 'Protein Plus Chocolate', category: 'Nutrition', price: 545, unitSize: '400 g', stock: 50, imageUrl: productImage('horlicks-protein-plus-chocolate.avif') },
  { brand: 'Horlicks', name: "Women's Plus", category: 'Nutrition', price: 499, unitSize: '400 g', stock: 65, imageUrl: productImage('horlicks-womens-plus.avif') },
  { brand: 'Indulekha', name: 'Bringha Hairfall Treatment', category: 'Hair Care', price: 432, unitSize: '100 ml', stock: 48, imageUrl: productImage('indulekha-bringha-hairfall-treatment.avif') },
  { brand: 'Kissan', name: 'Mixed Fruit Jam', category: 'Foods', price: 165, unitSize: '500 g', stock: 95, imageUrl: productImage('kissan-mixed-fruit-jam.avif') },
  { brand: 'Lakme', name: 'Eyeconic Kajal', category: 'Skin Care', price: 180, unitSize: '0.35 g', stock: 120, imageUrl: productImage('lakme-eyeconic-kajal.avif') },
  { brand: 'Lipton', name: 'Yellow Label Tea', category: 'Foods', price: 210, unitSize: '500 g', stock: 105, imageUrl: productImage('lipton-yellow-label-tea.avif') },
  { brand: 'Liquid I.V.', name: 'Lemon Lime Hydration Multiplier', category: 'Nutrition', price: 799, unitSize: '8 sticks', stock: 35, imageUrl: productImage('liquid-iv-lemon-lime-hydration-multiplier.avif') },
  { brand: 'Liril', name: 'Lime Soap', category: 'Personal Care', price: 48, unitSize: '125 g', stock: 300, imageUrl: productImage('liril-lime-soap.avif') },
  { brand: 'Love Beauty and Planet', name: 'Body Wash', category: 'Personal Care', price: 350, unitSize: '400 ml', stock: 70, imageUrl: productImage('love-beauty-and-planet-body-wash.avif') },
  { brand: 'Moti', name: 'Chandan Luxury Soap', category: 'Personal Care', price: 52, unitSize: '150 g', stock: 240, imageUrl: productImage('moti-chandan-luxury-soap.avif') },
  { brand: 'Nexxus', name: 'Promend Heat Protection Hair Spray', category: 'Hair Care', price: 699, unitSize: '100 ml', stock: 32, imageUrl: productImage('nexxus-promend-heat-protection-hair-spray.avif') },
  { brand: 'Novology', name: 'Acne Deep Cleanser', category: 'Skin Care', price: 249, unitSize: '100 g', stock: 68, imageUrl: productImage('novology-acne-deep-cleanser.avif') },
  { brand: 'Oziva', name: 'Hair Growth Serum', category: 'Hair Care', price: 599, unitSize: '30 ml', stock: 45, imageUrl: productImage('oziva-hair-growth-serum.avif') },
  { brand: 'Pears', name: 'Pure & Gentle Bodywash', category: 'Personal Care', price: 245, unitSize: '250 ml', stock: 115, imageUrl: productImage('pears-pure-gentle-bodywash.avif') },
  { brand: 'Rexona', name: 'Aloe Vera Deodorant', category: 'Personal Care', price: 165, unitSize: '150 ml', stock: 130, imageUrl: productImage('rexona-aloe-vera-deodorant.avif') },
  { brand: 'Rexona', name: 'Coconut & Olive Oil Soap', category: 'Personal Care', price: 55, unitSize: '125 g', stock: 260, imageUrl: productImage('rexona-coconut-olive-oil-soap.avif') },
  { brand: 'Rin', name: 'Matic Lavender Detergent', category: 'Home Care', price: 199, unitSize: '1 kg', stock: 180, imageUrl: productImage('rin-matic-lavender-detergent.avif') },
  { brand: 'Simple', name: 'Soothing Facial Toner', category: 'Skin Care', price: 385, unitSize: '200 ml', stock: 58, imageUrl: productImage('simple-soothing-facial-toner.avif') },
  { brand: 'Sunlight', name: 'Colour Lock Detergent Powder', category: 'Home Care', price: 125, unitSize: '1 kg', stock: 210, imageUrl: productImage('sunlight-colour-lock-detergent-powder.avif') },
  { brand: 'Sunsilk', name: 'Black Shine Shampoo', category: 'Hair Care', price: 165, unitSize: '340 ml', stock: 155, imageUrl: productImage('sunsilk-black-shine-shampoo.avif') },
  { brand: 'Taj Mahal', name: 'Tea', category: 'Foods', price: 275, unitSize: '500 g', stock: 92, imageUrl: productImage('taj-mahal-tea.avif') },
  { brand: 'TRESemme', name: 'Keratin Smooth Shampoo', category: 'Hair Care', price: 299, unitSize: '340 ml', stock: 100, imageUrl: productImage('tresemme-keratin-smooth-shampoo.avif') },
  { brand: 'VWash', name: 'Plus Intimate Hygiene Wash', category: 'Personal Care', price: 189, unitSize: '100 ml', stock: 90, imageUrl: productImage('vwash-plus-intimate-hygiene-wash.avif') },
]

const users = [
  { name: 'Admin User', email: 'admin@demo.com', password: 'admin123', storeName: 'TradeHub HQ', role: 'admin' },
  { name: 'Ramesh Sharma', email: 'retailer@demo.com', password: 'demo123', storeName: 'Sharma General Store', city: 'Delhi' },
]

const futureDate = (days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

const schemes = () => [
  { brand: 'Surf Excel', title: 'Buy 6 Get 1 Free', description: 'On Surf Excel Matic 1 kg packs this month', validTill: futureDate(11), minOrder: 1320 },
  { brand: 'Lifebuoy', title: '5% Extra Margin', description: 'On soap bars with minimum order of 24 units', validTill: futureDate(5), minOrder: 2304 },
  { brand: 'Horlicks', title: 'Rs 200 Cashback', description: 'On Rs 2,000+ order of the Horlicks product range', validTill: futureDate(10), minOrder: 2000 },
  { brand: 'Red Label', title: 'Buy 4 Get 1 Free', description: 'On Red Label Natural Care 500g pack', validTill: futureDate(20), minOrder: 940 },
]

export const seedDemoData = async ({ reset = false } = {}) => {
  if (reset) {
    await Promise.all([User.deleteMany(), Product.deleteMany(), Scheme.deleteMany()])
  }

  const [userCount, productCount, schemeCount] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Scheme.countDocuments(),
  ])

  if (userCount === 0) await User.create(users)
  if (productCount === 0) await Product.insertMany(products)
  if (productCount > 0) {
    await Product.bulkWrite(products.map((product) => ({
      updateOne: {
        filter: { brand: product.brand, name: product.name },
        update: { $set: { ...product, isActive: true } },
        upsert: true,
      },
    })))

    await Product.updateMany(
      { $nor: products.map(({ brand, name }) => ({ brand, name })) },
      { $set: { isActive: false } }
    )
  }
  if (schemeCount === 0) await Scheme.insertMany(schemes())

  return {
    users: userCount === 0 ? users.length : 0,
    products: productCount === 0 ? products.length : 0,
    schemes: schemeCount === 0 ? schemes().length : 0,
  }
}
