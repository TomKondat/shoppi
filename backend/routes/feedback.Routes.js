const express = require("express");
const feedbackControllers = require("../controllers/feedbackControllers");
const router = express.Router();

router
  .route("/")
  .post(feedbackControllers.createFeedback)
  .get(feedbackControllers.getAllFeedbacks);

module.exports = router;
