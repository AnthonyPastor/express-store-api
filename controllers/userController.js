const { response, request } = require("express");
const userRepository = require("../database/repositories/userRepository");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, page = 1 } = req.query;

  //TODO: Add filter to getUsers
  const response = await new userRepository().GetUsers(limit, page);

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

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const { uid, user } = req;
  const response = await new userRepository().DeleteUser(id);
  res.json({
    response,
    auhtenticatedUser: { user },
  });
};
module.exports = {
  usersGet,
  userPost,
  userGetById,
  userDelete,
};
