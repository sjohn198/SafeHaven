import mongoose from "mongoose";
import orderModel from "../models/product.js";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
const local_uri = "mongodb://127.0.0.1:27017/Orders";

mongoose.set("debug", true);

mongoose
  .connect(uri)
  .catch((error) => console.log(error));

function getOrders(product, quantity) {
  let promise;
  if (product === undefined && quantity === undefined) {
    promise = orderModel.find();
  } else if (product && !quantity) {
    promise = findOrderByProduct(product);
  } else if (quantity && !product) {
    promise = findOrderByQuantity(quantity);
  } else if (product && quantity) {
    promise = findOrderByProductAndQuantity(product, quantity);
  }
  return promise;
}

function findOrderById(id) {
  return orderModel.findById(id);
}

function removeOrder(id) {
  return orderModel.findByIdAndDelete(id);
}

function addOrder(Order) {
  const orderToAdd = new orderModel(Order);
  const promise = orderToAdd.save();
  return promise;
}

function findOrderByProduct(product) {
  return orderModel.find({ product: product });
}

function findOrderByQuantity(quantity) {
  return orderModel.find({ quantity: quantity });
}

function findOrderByProductAndQuantity(product, quantity) {
    return orderModel.find({ product: product, quantity: quantity });
}

export default {
  addOrder,
  removeOrder,
  getOrders,
  findOrderById,
  findOrderByProduct,
  findOrderByQuantity,
  findOrderByProductAndQuantity
};