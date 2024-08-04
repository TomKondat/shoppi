const Feedback = require("./../models/feedbackModel");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");

exports.createFeedback = asyncHandler(async (req, res, next) => {
  const { productId, rating, review, author } = req.body;

  const newFeedback = await Feedback.create({ rating, review, author });
  const product = await Product.findById(productId);

  product.feedbacks.push(newFeedback._id);
  product.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    newFeedback,
    product,
  });
});

exports.getAllFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();
  res.status(200).json({
    status: "success",
    feedbacks,
  });
});
