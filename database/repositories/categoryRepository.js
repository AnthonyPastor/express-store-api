const { Category } = require("../../models");

//The goal of this class is to interact with the DB. It should inherit from an Interface, so when you want to get access yo the database,
//you must use the interface methods instead of this class

//Using generics, we could generalize the access of all repositories

class categoryRepository {
  async GetCategories(limit, page) {
    try {
      const [total, categories] = await Promise.all([
        Category.countDocuments({ deleted: false }),
        Category.find({ deleted: false })
          .populate("user", "name")
          .skip(Number(limit) * (Number(page) - 1))
          .limit(Number(limit)),
      ]);

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
