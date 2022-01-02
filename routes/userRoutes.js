const { Router } = require("express");
const { check } = require("express-validator");
const { mailExist, existUserId } = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userGetById,
  userDelete,
} = require("../controllers/userController");
const { validateFields, validateJWT } = require("../middlewares");

const userRouter = Router();

userRouter.get("/", usersGet); //TODO Getting endpoints must validate role of client

userRouter.post(
  "/",
  [
    check("email", "Email is invalid").isEmail(),
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

userRouter.get(
  "/:id",
  [
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  userGetById
); //TODO Getting endpoints must validate role of client

userRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  userDelete
);

module.exports = userRouter;
