import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      _id: {
        type: String,
        required: false
      },
      product: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      __v: {
        type: Number,
        required: false
      }
    }
  ],
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
