const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { mailExist } = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userGetById,
} = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", usersGet);

userRouter.post(
  "/",
  [
    check("email", "Email is invalid").not().isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must have more of 6 characters").isLength({
      min: 6,
    }),
    check("name", "Name is required").not().isEmpty(),
    check("email").custom(mailExist),
    validateFields, //Custom Middleware
  ],
  userPost
);

userRouter.get("/:id", userGetById);

module.exports = userRouter;
