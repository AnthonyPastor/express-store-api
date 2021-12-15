const { model, Schema } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name of product is required"],
  },
  price: {
    type: Number,
    required: [true, "Price of product is required"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Product", ProductSchema);
