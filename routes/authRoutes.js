const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { mailExist } = require("../helpers/db-validators");
const { login, googleSignIn } = require("../controllers/authController");

const authRouter = Router();

//userRouter.get("/", usersGet);

authRouter.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields, //Custom Middleware
  ],
  login
);

authRouter.post(
  "/google",
  [
    check("id_token", "id_token is required").not().isEmpty(),
    validateFields, //Custom Middleware
  ],
  googleSignIn
);

//userRouter.get("/:id", userGetById);

module.exports = authRouter;
