const Category = require("../../models/category");

//The goal of this class is to interact with the DB. It should inherit from an Interface, so when you want to get access yo the database,
//you must use the interface methods instead of this class

//Using generics, we could generalize the access of all repositories

class categoryRepository {
  async GetCategories(limit, page) {
    try {
      const categories = await Category.find({ deleted: false })
        .skip(Number(limit) * (Number(page) - 1))
        .limit(Number(limit));

      const total = await Category.countDocuments({ deleted: false });
      return { success: true, response: { total, categories } };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async GetCategoryById(id) {
    try {
      const category = await Category.findById(id);

      return {
        success: true,
        response: category,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async PostCategory(data) {
    try {
      const category = new Category(data);

      await category.save();

      return {
        success: true,
        response: category,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async DeleteCategory(id) {
    try {
      const category = await Category.findByIdAndUpdate(id, { deleted: true });
      await category.save();

      return {
        success: true,
        response: "Deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }
}

module.exports = categoryRepository;
