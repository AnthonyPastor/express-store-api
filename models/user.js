const { model, Schema } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User emial is required"],
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
  },
  age: {
    type: Number,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return {
    uid: _id,
    ...user,
  };
};
module.exports = model("User", userSchema);
