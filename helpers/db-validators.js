const Category = require("../models/category");
const Product = require("../models/product");
const Role = require("../models/role");
const User = require("../models/user");

const mailExist = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error("A User with that email already exist");
  }
};

const existUserId = async (id = "") => {
  const existUserId = await User.findOne({ id });
  if (!existUserId) {
    throw new Error("A User with that ID doesn't exist");
  }
};

const existProductId = async (id = "") => {
  const existProductId = await Product.findOne({ id });
  if (!existProductId) {
    throw new Error("A Product with that ID doesn't exist");
  }
};

const existCategoryId = async (id = "") => {
  const existCategoryId = await Category.findOne({ id });
  if (!existCategoryId) {
    throw new Error("A Category with that ID doesn't exist");
  }
};

const categoryAlreadyExist = async (name = "") => {
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    throw new Error("A Category with that name already exist");
  }
};

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole && role !== "") {
    throw new Error(`Role ${role} is not registed in DB`);
  }
};

module.exports = {
  mailExist,
  existUserId,
  existProductId,
  isValidRole,
  existCategoryId,
  categoryAlreadyExist,
};
