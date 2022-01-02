const Constant = require("../models/constant");

const Success = new Constant(1, "Success!");
const GenericError = new Constant(2, "Generic Error");

module.exports = {
  Success,
  GenericError,
};
