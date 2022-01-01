const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    console.log(",,mm");
    //Verify if mail exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password aren't correct",
      });
    }
    // Verify if user is active
    if (user.deleted) {
      return res.status(400).json({
        msg: "User is not active",
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Unexpected error",
      error: error,
    });
  }
};

module.exports = { login };
