const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validate-jwt");

module.exports = {
  ...validateFields,
  ...validateJWT,
};
