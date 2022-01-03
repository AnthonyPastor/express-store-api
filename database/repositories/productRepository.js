const Product = require("../../models/product");

//The goal of this class is to interact with the DB. It should inherit from an Interface, so when you want to get access yo the database,
//you must use the interface methods instead of this class

//Using generics, we could generalize the access of all repositories

class productRepository {
  async GetProducts(limit, page) {
    try {
      const products = await Product.find({ deleted: false })
        .skip(Number(limit) * (Number(page) - 1))
        .limit(Number(limit));

      const total = await Product.countDocuments({ deleted: false });
      return { success: true, response: { total, products } };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async GetProductById(id) {
    try {
      const product = await Product.findById(id);

      return {
        success: true,
        response: product,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async PostProduct(data) {
    try {
      const product = new Product(data);

      await product.save();

      return {
        success: true,
        response: product,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async DeleteProduct(id) {
    try {
      const product = await Product.findByIdAndUpdate(id, { deleted: true });
      await product.save();

      return {
        success: true,
        response: "Delete successful",
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }
}

module.exports = productRepository;
