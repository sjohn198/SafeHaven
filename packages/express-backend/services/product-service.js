import mongoose from "mongoose";
import ProductModel from "../models/product.js";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose.set("debug", true);

mongoose.connect(uri).catch((error) => console.log(error));

function getProducts(product, quantity) {
  let promise;
  if (product === undefined && quantity === undefined) {
    promise = ProductModel.find();
  } else if (product && !quantity) {
    promise = findProductByProduct(product);
  } else if (quantity && !product) {
    promise = findProductByQuantity(quantity);
  } else if (product && quantity) {
    promise = findProductByProductAndQuantity(product, quantity);
  }
  return promise;
}

function findProductById(id) {
  return ProductModel.findById(id);
}

function findProductsByIds(productIds) {
  return ProductModel.find({ _id: { $in: productIds } });
}

function removeProduct(id) {
  return ProductModel.findByIdAndDelete(id);
}

function addProduct(product) {
  const updateObject = {
    $set: { price: product.price }
  };

  if (product.quantity !== null && product.quantity !== undefined && product.quantity !== "") {
    updateObject.$inc = { quantity: product.quantity };
  }

  return ProductModel.findOneAndUpdate({ product: product.product }, updateObject, {
    upsert: true,
    new: true
  });
}

function findProductByProduct(product) {
  return ProductModel.find({ product: product });
}

function findProductByQuantity(quantity) {
  return ProductModel.find({ quantity: quantity });
}

function findProductByProductAndQuantity(product, quantity) {
  return ProductModel.find({ product: product, quantity: quantity });
}

function changeProductById(id, product) {
  console.log(product);
  console.log("hi");
  return ProductModel.findByIdAndUpdate(id, product, { new: true });
}

export default {
  addProduct,
  removeProduct,
  getProducts,
  findProductById,
  findProductByProduct,
  findProductByQuantity,
  findProductByProductAndQuantity,
  changeProductById,
  findProductsByIds
};
