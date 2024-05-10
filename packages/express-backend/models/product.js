import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { collection: 'products' } // Specify collection name
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
