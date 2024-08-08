const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");
const factory = require("./factoryHandlers");

exports.getUsers = factory.getAll(User);

exports.getUserById = factory.getOne(User);
