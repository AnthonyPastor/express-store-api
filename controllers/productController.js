const { response, request } = require("express");
const productRepository = require("../database/repositories/productRepository");

const productsGet = async (req = request, res = response) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    const { success, response } = await new productRepository().GetProducts(
      limit,
      page
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting Products",
        details: response,
        products: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Products success!",
        details: "",
        products: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Products",
      details: error.toString(),
      products: {},
    });
  }
};

const productGetById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { success, response } = await new productRepository().GetProductById(
      id
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting Product",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Products success!",
        details: "",
        product: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Product",
      details: error.toString(),
      product: {},
    });
  }
};

const productPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    const { success, response } = await new productRepository().PostProduct(
      body
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error postting Product",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Post Products success!",
        details: "",
        product: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error postting Product",
      details: error.toString(),
      product: {},
    });
  }
};

const productDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { success, response } = await new productRepository().DeleteProduct(
      id
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error deletting Product",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Delete Products success!",
        details: "",
        products: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error deletting Product",
      details: error.toString(),
      product: {},
    });
  }
};

module.exports = {
  productsGet,
  productGetById,
  productPost,
  productDelete,
};
