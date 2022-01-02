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
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
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
