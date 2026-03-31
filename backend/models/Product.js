import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
