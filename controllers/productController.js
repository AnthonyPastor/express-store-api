const { response, request } = require("express");
const productRepository = require("../database/repositories/productRepository");

const productsGet = async (req = request, res = response) => {
  const response = await new productRepository().GetProducts();

  res.json({
    response,
  });
};

const productGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const response = await new productRepository().GetProductById(id);

  res.json({
    response,
  });
};

const productPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    const response = await new productRepository().PostProduct(body);

    res.json({
      response,
    });
  } catch (error) {
    res.json({
      msg: `Unspected error: ${error}`,
    });
  }
};

module.exports = {
  productsGet,
  productGetById,
  productPost,
};
