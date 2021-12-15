const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  productsGet,
  productGetById,
  productPost,
} = require("../controllers/productController");

const productRouter = Router();

productRouter.get("/", productsGet);

productRouter.get("/:id", productGetById);

productRouter.post(
  "/",
  [
    check("category", "Category is required").not().isEmpty(),
    check("description", "Descripcion is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("price", "Price is required").not().isNumeric(),
    check("name", "Name is required").not().isEmpty(),
    validateFields, //Custom Middleware
  ],
  productPost
);

module.exports = productRouter;
