const User = require("../../models/user");
const bcryptjs = require("bcryptjs");

//The goal of this class is to interact with the DB. It should inherit from an Interface, so when you want to get access yo the database,
//you must use the interface methods instead of this class

//Using generics, we could generalize the access of all repositories
class userRepository {
  async GetUsers(limit, page) {
    try {
      const [total, users] = await Promise.all([
        User.countDocuments({ deleted: false }),
        User.find({ deleted: false })
          .skip(Number(limit) * (Number(page) - 1))
          .limit(Number(limit)),
      ]);

      return { success: true, response: { total, users } };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async GetUserById(id) {
    try {
      const user = await User.findById(id);

      return {
        success: true,
        response: user,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async PostUser(data) {
    try {
      const { password, email, ...other } = data;
      const user = new User({ password, email, ...other });

      //Encrypt password
      const salt = await bcryptjs.genSaltSync();

      user.password = await bcryptjs.hashSync(password, salt);

      await user.save();

      return {
        success: true,
        response: user,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async DeleteUser(id) {
    try {
      const user = await User.findByIdAndUpdate(id, { deleted: true });
      await user.save();

      return {
        success: true,
        response: "Delete successful!",
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }

  async UpdateUser(id, data) {
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      await user.save();

      return {
        success: true,
        response: user,
      };
    } catch (error) {
      return {
        success: false,
        response: error.toString(),
      };
    }
  }
}

module.exports = userRepository;
