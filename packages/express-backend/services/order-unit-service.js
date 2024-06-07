import mongoose from "mongoose";
import OrderUnitModel from "../models/order-unit.js";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose.set("debug", true);

mongoose.connect(uri).catch((error) => console.log(error));

function getOrder(id, product, quantity) {
  let promise;
  if (product === undefined && quantity === undefined && id == undefined) {
    promise = OrderUnitModel.find();
  } else if (id) {
    promise = findOrderById(id);
  } else if (product && quantity) {
    promise = findOrderByProductAndQuantity(product, quantity);
  }
  return promise;
}

function findOrderById(id) {
  return OrderUnitModel.findById(id);
}

function removeOrder(id) {
  return OrderUnitModel.findByIdAndDelete(id);
}

function addOrder(order_unit) {
  const OrderToAdd = new OrderUnitModel(order_unit);
  const promise = OrderToAdd.save();
  return promise;
}

function findOrderByProductAndQuantity(product, quantity) {
  return OrderUnitModel.find({ product: product, quantity: quantity });
}

export default {
  addOrder,
  removeOrder,
  getOrder,
  findOrderById,
  findOrderByProductAndQuantity
};
