const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const { User, Product, Category, Role } = require("../models");
const allowedCollections = ["categories", "products", "users"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const user = await User.findById(term);
    res.json({
      success: user ? true : false,
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
  });

  res.json({
    success: true,
    results: users,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const product = await Product.findById(term)
      .populate("category", "name")
      .populate("user", "name");
    res.json({
      success: product ? true : false,
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");

  const products = await Product.find({
    $or: [{ name: regex }],
    $and: [{ deleted: false }],
  })
    .populate("category", "name")
    .populate("user", "name");

  res.json({
    success: true,
    results: products,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const category = await Category.findById(term).populate("user", "name");
    res.json({
      success: category ? true : false,
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i");

  const categories = await Category.find({
    $or: [{ name: regex }],
    $and: [{ deleted: false }],
  }).populate("user", "name");

  res.json({
    success: true,
    results: categories,
  });
};

const search = async (req = request, res = response) => {
  try {
    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
      return res.status(400).json({
        success: false,
        msg: "Collection not allowed",
        details: "",
        data: {},
      });
    }
    switch (collection) {
      case "users":
        searchUsers(term, res);
        break;
      case "categories":
        searchCategories(term, res);
        break;
      case "products":
        searchProducts(term, res);
        break;
      default:
        res.status(500).json({
          success: false,
          msg: `Collection ${collection} not found`,
          details: "",
          data: {},
        });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: error.toString(),
      details: "",
      data: {},
    });
  }
};

const searchProductsByCatagory = async (req = request, res = response) => {
  const { categoryId } = req.params;

  const isMongoId = isValidObjectId(categoryId);
  if (isMongoId) {
    const categories = await Product.find({
      category: new ObjectId(categoryId),
    }).populate("user", "name");

    res.json({
      success: categories ? true : false,
      results: categories ? [categories] : [],
    });
  }
};

module.exports = { search, searchProductsByCatagory };
