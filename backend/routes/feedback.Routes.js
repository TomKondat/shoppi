const express = require("express");
const feedbackControllers = require("../controllers/feedbackControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authControllers.protect, feedbackControllers.createFeedback)
  .get(
    authControllers.protect,
    (req, res, next) => {
      console.log("chipopi");
      next();
    },
    feedbackControllers.getFeedbacksByProductId
  );

module.exports = router;
