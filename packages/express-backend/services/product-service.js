import mongoose from 'mongoose'
import ProductModel from '../models/product.js'
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.MONGODB_URI
const local_uri = 'mongodb://127.0.0.1:27017/Products'

mongoose.set('debug', true)

mongoose.connect(uri).catch((error) => console.log(error))

function getProducts(product, quantity) {
  let promise
  if (product === undefined && quantity === undefined) {
    promise = ProductModel.find()
  } else if (product && !quantity) {
    promise = findProductByProduct(product)
  } else if (quantity && !product) {
    promise = findProductByQuantity(quantity)
  } else if (product && quantity) {
    promise = findProductByProductAndQuantity(product, quantity)
  }
  return promise
}

function findProductById(id) {
  return ProductModel.findById(id)
}

function removeProduct(id) {
  return ProductModel.findByIdAndDelete(id)
}

function addProduct(product) {
  console.log(product);
  console.log("hi");
  return ProductModel.findOneAndUpdate(
    { product: product.product },
    { $inc: { quantity: product.quantity } },
    { upsert: true, new: true }
  )
}

function findProductByProduct(product) {
  return ProductModel.find({ product: product })
}

function findProductByQuantity(quantity) {
  return ProductModel.find({ quantity: quantity })
}

function findProductByProductAndQuantity(product, quantity) {
  return ProductModel.find({ product: product, quantity: quantity })
}

export default {
  addProduct,
  removeProduct,
  getProducts,
  findProductById,
  findProductByProduct,
  findProductByQuantity,
  findProductByProductAndQuantity,
}
