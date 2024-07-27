const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "success",
    users,
  });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const users = await User.findById(id);
  res.status(200).json({
    status: "success",
    users,
  });
});
