const { response, request } = require("express");

const ordersGet = (req = request, res = response) => {
  const { price } = req.query;
  res.json({
    msg: "Get orders success",
    price,
  });
};

const orderGetById = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "Get order by Id success",
    id,
  });
};

const orderPost = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: "post order success",
    body,
  });
};

module.exports = {
  ordersGet,
  orderGetById,
  orderPost,
};
