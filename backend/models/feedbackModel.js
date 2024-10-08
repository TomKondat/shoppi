const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: [1, "Rating must be above 0"],
    max: [10, "Rating cant be above 10"],
    required: [true, "Feedback must have a rating"],
  },
  review: {
    type: String,
    maxLength: 300,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Feedback must have a product"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Feedback must have an author"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

feedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "username",
  });
  next();
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
