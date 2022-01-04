const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // API paths
    this.paths = {
      auth: "/api/auth",
      categories: "/api/category",
      orders: "/api/order",
      products: "/api/product",
      users: "/api/user",
      search: "/api/search",
    };

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
    this.app.use(this.paths.auth, require("../routes/authRoutes"));
    this.app.use(this.paths.categories, require("../routes/categoryRoutes"));
    this.app.use(this.paths.orders, require("../routes/orderRoutes"));
    this.app.use(this.paths.products, require("../routes/productRoutes"));
    this.app.use(this.paths.search, require("../routes/searchRoutes"));
    this.app.use(this.paths.users, require("../routes/userRoutes"));
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port: ${this.port}`);
    });
  }
}
module.exports = Server;
