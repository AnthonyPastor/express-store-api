const { response, request } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const updateImage = async (req = request, res = response) => {
  try {
    let model;

    const { id, collection } = req.params;
    switch (collection) {
      case "users":
        console.log("lol");
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            error: true,
            response: `User with id: ${id}, doesn't exist`,
          });
        }
        break;
      case "products":
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            error: true,
            response: `Product with id: ${id}, doesn't exist`,
          });
        }
        break;
      default:
        return res
          .status(500)
          .json({ error: true, response: "Collection not found!" });
    }

    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    return res.json({ error: false, response: model });
  } catch (error) {
    console.log(error);
    return res.json({ error: true, response: error.toString() });
  }
};

module.exports = {
  updateImage,
};
