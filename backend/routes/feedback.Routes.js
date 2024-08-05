const express = require("express");
const feedbackControllers = require("../controllers/feedbackControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authControllers.protect, feedbackControllers.createFeedback)
  .get(feedbackControllers.getFeedbacksByProductId);

module.exports = router;
