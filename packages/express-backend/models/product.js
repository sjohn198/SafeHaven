import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String, // [String]
      required: true,
      trim: true,
    },
    quantity: {
      type: String, // [Number]
      required: true,
      trim: true,
      /* validate(value) {
        if (value.length < 2)
          throw new Error("Invalid quantity, must be at least 2 numbers.");
      }, */
    },
  },
  { collection: "products" } // Specify collection name
);


const Product = mongoose.model("Product", ProductSchema);

export default Product;
