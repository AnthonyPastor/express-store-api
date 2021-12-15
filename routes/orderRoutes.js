const { Router } = require("express");
const {
  ordersGet,
  orderGetById,
  orderPost,
} = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/", ordersGet);

orderRouter.get("/:id", orderGetById);

orderRouter.post("/", orderPost);

module.exports = orderRouter;
