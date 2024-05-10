import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    items: [{
      product: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    item_count: {
        type: Number,
        required: true
    },
    total_profit: {
        type: Number,
        required: false
    }
  });

const Order = mongoose.model("Order", OrderSchema);
export default Order;