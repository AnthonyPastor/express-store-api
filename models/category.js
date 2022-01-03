const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name of the category is required"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

categorySchema.methods.toJSON = function () {
  const { __v, _id, deleted, ...category } = this.toObject();
  return {
    id: _id,
    ...category,
  };
};
module.exports = model("Category", categorySchema);
