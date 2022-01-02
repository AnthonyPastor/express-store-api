const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const userRepository = require("../database/repositories/userRepository");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({ success: false, response: "Token is empty" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRETKEY);

    const { response } = await new userRepository().GetUserById(userId);

    if (!response) {
      return res.status(401).json({
        success: false,
        response: "Invalid token - user doesn't exist",
      });
    }
    //Verify if user is deleted
    if (response.deleted) {
      return res
        .status(401)
        .json({ success: false, response: "Invalid token - Deleted user" });
    }

    req.user = response;
    req.uid = userId;
    console.log(userId);
    console.log(response);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      response: `Token is invalid - ${error.toString()}`,
    });
  }
};

module.exports = {
  validateJWT,
};
