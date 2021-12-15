const User = require("../../models/user");
const bcryptjs = require("bcryptjs");

class userRepository {
  async GetUsers(limit, page) {
    try {
      const users = await User.find();

      return users;
    } catch (error) {
      return error;
    }
  }

  async GetUserById(id) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      return error;
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
        response: error,
      };
    }
  }
}

module.exports = userRepository;
