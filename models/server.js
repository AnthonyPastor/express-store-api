const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // API paths
    this.usersPath = "/api/user";
    this.productsPath = "/api/product";
    this.ordersPath = "/api/order";
    this.authPath = "/api/auth";
    this.categoriesPath = "/api/category";

    // BD Connection
    this.conectDb();

    // Middlewares
    this.middlewares();

    // Routes of application
    this.routes();
  }

  async conectDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and parse
    this.app.use(express.json());

    // Public Directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/authRoutes"));
    this.app.use(this.usersPath, require("../routes/userRoutes"));
    this.app.use(this.productsPath, require("../routes/productRoutes"));
    this.app.use(this.ordersPath, require("../routes/orderRoutes"));
    this.app.use(this.categoriesPath, require("../routes/categoryRoutes"));
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port: ${this.port}`);
    });
  }
}
module.exports = Server;
