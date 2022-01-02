const { response, request } = require("express");
const userRepository = require("../database/repositories/userRepository");

const usersGet = async (req = request, res = response) => {
  try {
    const { limit = 5, page = 1 } = req.query;

    //TODO: Add filter to getUsers
    const { success, response } = await new userRepository().GetUsers(
      limit,
      page
    );

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting Users",
        details: response,
        products: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Get Users success!",
        details: "",
        products: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error getting Users",
      details: error.toString(),
      products: {},
    });
  }
};

const userPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    const { success, response } = await new userRepository().PostUser(body);

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error postting User",
        details: response,
        product: {},
      });
    } else {
      res.json({
        success: success,
        msg: "Post User success!",
        details: "",
        product: response,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: "Unexpected error postting User",
      details: error.toString(),
      product: {},
    });
  }
};

const userGetById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { success, response } = await new userRepository().GetUserById(id);

    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error getting User",
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
      msg: "Unexpected error getting User",
      details: error.toString(),
      product: {},
    });
  }
};

const userDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { uid, user } = req;
    const { success, response } = await new userRepository().DeleteUser(id);
    if (!success) {
      res.json({
        success: success,
        msg: "Unexpected error deletting User",
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
      msg: "Unexpected error deletting User",
      details: error.toString(),
      product: {},
    });
  }
};
module.exports = {
  usersGet,
  userPost,
  userGetById,
  userDelete,
};
