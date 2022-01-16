const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
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

const googleSignIn = async (req, res = response) => {
  try {
    const { id_token } = req.body;
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      //If user doesn't exist, create it
      const data = {
        name,
        email,
        password: ":(",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (user.deleted) {
      return res.status(401).json({
        success: false,
        response: "User is blocked, call to an admin!",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      success: true,
      response: "User verified",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error.toString(),
    });
  }
};

module.exports = { login, googleSignIn };
