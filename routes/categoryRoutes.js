const { Router } = require("express");
const { check } = require("express-validator");
const {
  categoriesGet,
  categoryGetById,
  categoryPost,
  categoryDelete,
} = require("../controllers/categoryController");
const {
  existCategoryId,
  categoryAlreadyExist,
} = require("../helpers/db-validators");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const categoryRouter = Router();

categoryRouter.get("/", categoriesGet); //TODO Getting endpoints must validate role of client

categoryRouter.get(
  "/:id",
  [
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existCategoryId),
    validateFields,
  ],
  categoryGetById
); //TODO Getting endpoints must validate role of client

categoryRouter.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryAlreadyExist),
    validateFields, //Custom Middleware
  ],
  categoryPost
);

categoryRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existCategoryId),
    validateFields,
  ],
  categoryDelete
);

module.exports = categoryRouter;
