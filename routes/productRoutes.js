const { Router } = require("express");
const { check } = require("express-validator");
const {
  productsGet,
  productGetById,
  productPost,
  productDelete,
} = require("../controllers/productController");
const { existProductId } = require("../helpers/db-validators");
const { validateJWT, validateFields } = require("../middlewares");

const productRouter = Router();

productRouter.get("/", productsGet); //TODO Getting endpoints must validate role of client

productRouter.get(
  "/:id",
  [
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existProductId),
    validateFields,
  ],
  productGetById
); //TODO Getting endpoints must validate role of client

productRouter.post(
  "/",
  [
    validateJWT,
    check("category", "Category is required").not().isEmpty(),
    check("description", "Descripcion is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("price", "Price must be numeric").isNumeric(),
    check("name", "Name is required").not().isEmpty(),
    validateFields, //Custom Middleware
  ],
  productPost
);

productRouter.delete(
  "/:id",
  [
    validateJWT,
    check("id", "ID is invalid").isMongoId(),
    check("id").custom(existProductId),
    validateFields,
  ],
  productDelete
);

module.exports = productRouter;
