const User = require("./../models/userModel");

exports.addNewUser = async (req, res) => {
  const { username, email, age, password, confirmPassword } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      age,
      password,
      confirmPassword,
    });
    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
