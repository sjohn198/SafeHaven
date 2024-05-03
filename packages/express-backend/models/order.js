import mongoose, { Mongoose } from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        items: [{
            product: Schema.Types.ObjectId,
            ref: "Product",
            quantity: Number,
            required: true,
            trim: true
        }]
    },
    { collection: "orders" }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;