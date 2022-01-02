const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-role");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};
