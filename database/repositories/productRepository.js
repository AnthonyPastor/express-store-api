const Product = require("../../models/product");

class productRepository {
  async GetProducts(limit, page) {
    try {
      const products = await Product.find({ deleted: false })
        .skip(Number(limit) * (Number(page) - 1))
        .limit(Number(limit));

      const total = await Product.countDocuments();
      return { total, products };
    } catch (error) {
      return {};
    }
  }

  async GetProductById(id) {
    try {
      const product = await Product.findById(id);

      return product;
    } catch (error) {
      return {};
    }
  }

  async PostProduct(data) {
    try {
      const product = new Product(data);

      await product.save();

      console.log(product);

      return product;
    } catch (error) {
      return {};
    }
  }
}

module.exports = productRepository;
