const Feedback = require("./../models/feedbackModel");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");

exports.createFeedback = asyncHandler(async (req, res, next) => {
  const { productId, rating, review, createDateAt } = req.body;
  const author = req.body.author || req.user._id;
  if (!author) return next(new AppError("The author is not defined", 401));
  const newFeedback = await Feedback.create({
    rating,
    review,
    author,
    product: productId,
    createDateAt,
  });
  res.status(201).json({
    status: "success",
    newFeedback,
  });
});

exports.getFeedbacksByProductId = asyncHandler(async (req, res, next) => {
  const { createdAt } = req.body;
  const { productId } = req.params;

  const filterQueryObj = { ...req.query };

  delete filterQueryObj["sort"];
  let queryStr = JSON.stringify(filterQueryObj);
  let query = Feedback.find(JSON.parse(queryStr));
  query = query.sort("-createdAt");
  const feedbacks = await query;
  console.log(`feedback: ${feedbacks}`);
  res.status(200).json({
    status: "success",
    feedbacks,
  });
});
