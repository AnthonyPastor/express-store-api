const { Router } = require("express");
const { check } = require("express-validator");
const { updateImage } = require("../controllers/uploadsController");
const { allowedCollections } = require("../helpers");
const { validateFields } = require("../middlewares/validateFields");

const fileRoutes = Router();

fileRoutes.put(
  "/:collection/:id",
  [
    check("id", "ID is invalid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields, //Custom Middleware
  ],
  updateImage
);

module.exports = fileRoutes;
