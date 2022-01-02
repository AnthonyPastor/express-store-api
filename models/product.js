const { model, Schema } = require("mongoose");

const productSchema = Schema({
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
  img: {
    type: Boolean,
    default: false,
  },
});

productSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  return {
    id: _id,
    ...product,
  };
};
module.exports = model("Product", productSchema);
