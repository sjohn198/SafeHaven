import mongoose from "mongoose";
import OrderModel from "../models/order.js";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
const local_uri = "mongodb://127.0.0.1:27017/Orders";

mongoose.set("debug", true);

mongoose
  .connect(uri)
  .catch((error) => console.log(error));

function getOrder(id, product, quantity) {
  let promise;
  if (product === undefined && quantity === undefined && id == undefined) {
    promise = OrderModel.find();
  } else if (id) {
    promise = findOrderById(id);
  } else if (product && quantity) {
    promise = findOrderByProductAndQuantity(product, quantity);
  }
  return promise;
}

function findOrderById(id) {
  return OrderModel.findById(id);
}

function removeOrder(id) {
  return OrderModel.findByIdAndDelete(id);
}

function addOrder(order) {
  const OrderToAdd = new OrderModel(order);
  const promise = OrderToAdd.save();
  return promise;
}

function findOrderByProductAndQuantity(product, quantity) {
    return OrderModel.find({ product: product, quantity: quantity });
}

export default {
  addOrder,
  removeOrder,
  getOrder,
  findOrderById,
  findOrderByProductAndQuantity
};