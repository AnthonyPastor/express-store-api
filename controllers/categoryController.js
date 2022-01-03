const { response, request } = require("express");
const categoryRepository = require("../database/repositories/categoryRepository");

const categoriesGet = async (req = request, res = response) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    const { success, response } = await new categoryRepository().GetCategories(
      limit,
      page
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting Cetegories",
        details: response,
        products: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Cetegories success!",
        details: "",
        products: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Cetegories",
      details: error.toString(),
      products: {},
    });
  }
};
const categoryGetById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { success, response } =
      await new categoryRepository().GetCategoryById(id);

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting Category",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Category success!",
        details: "",
        product: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Category",
      details: error.toString(),
      product: {},
    });
  }
};

const categoryPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    const { success, response } = await new categoryRepository().PostCategory(
      body
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error postting Category",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Post Category success!",
        details: "",
        product: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error postting Category",
      details: error.toString(),
      product: {},
    });
  }
};

const categoryDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { success, response } = await new categoryRepository().DeleteCategory(
      id
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error deletting Category",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Delete Category success!",
        details: "",
        products: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error deletting Category",
      details: error.toString(),
      product: {},
    });
  }
};

module.exports = {
  categoriesGet,
  categoryGetById,
  categoryDelete,
  categoryPost,
};
