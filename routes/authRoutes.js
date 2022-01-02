const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { mailExist } = require("../helpers/db-validators");
const { login } = require("../controllers/authController");

const authRouter = Router();

//userRouter.get("/", usersGet);

authRouter.post(
  "/",
  [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    validateFields, //Custom Middleware
  ],
  login
);

//userRouter.get("/:id", userGetById);

module.exports = authRouter;
