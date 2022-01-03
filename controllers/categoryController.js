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
        categories: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Cetegories success!",
        details: "",
        categories: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Cetegories",
      details: error.toString(),
      categories: {},
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
        category: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Category success!",
        details: "",
        category: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Category",
      details: error.toString(),
      category: {},
    });
  }
};

const categoryPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    body.user = req.user._id;
    const { success, response } = await new categoryRepository().PostCategory(
      body
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error postting Category",
        details: response,
        category: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Post Category success!",
        details: "",
        category: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error postting Category",
      details: error.toString(),
      category: {},
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
        category: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Delete Category success!",
        details: "",
        category: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error deletting Category",
      details: error.toString(),
      category: {},
    });
  }
};

module.exports = {
  categoriesGet,
  categoryGetById,
  categoryDelete,
  categoryPost,
};
