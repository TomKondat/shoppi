const Feedback = require("./../models/feedbackModel");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");
const factory = require("./factoryHandlers");

exports.createFeedback = factory.createOne(Feedback);

exports.getFeedbacksByProductId = factory.getAll(Feedback);
