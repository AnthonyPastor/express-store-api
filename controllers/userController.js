const { response, request } = require("express");
const userRepository = require("../database/repositories/userRepository");

const usersGet = async (req = request, res = response) => {
  const { name } = req.query;

  //TODO: Add filter to getUsers
  const response = await new userRepository().GetUsers();

  res.json({
    response,
  });
};

const userPost = async (req = request, res = response) => {
  const body = req.body;
  const { success, response } = await new userRepository().PostUser(body);

  res.status(success ? 200 : 500).json({
    response,
  });
};

const userGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const response = await new userRepository().GetUserById(id);
  res.json({
    response,
  });
};

module.exports = {
  usersGet,
  userPost,
  userGetById,
};
