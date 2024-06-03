import mongoose from "mongoose";

const OrderUnitSchema = new mongoose.Schema({
      product: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
);

const OrderUnit = mongoose.model("OrderUnit", OrderUnitSchema);
export default OrderUnit;