const { Success } = require("../../constants/generic-constants");

/// Response have this model:
/// constant : Constant
/// error : Boolean -> indicates if an error happened
/// details : String -> more information of the response
class Response {
  constructor() {
    this.constant = Success;
    this.error = false;
    this.details = "";
  }
  constructor(constant) {
    this.constant = constant;
    this.error = true;
    this.details = "";
  }
  constructor(constant, details) {
    this.constant = constant;
    this.error = true;
    this.details = details;
  }
}


module.exports = Response;