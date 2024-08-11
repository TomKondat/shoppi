const express = require("express");
const feedbackControllers = require("../controllers/feedbackControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authControllers.protect,
    (req, res, next) => {
      req.body.author = req.user._id;
      next();
    },
    feedbackControllers.createFeedback
  )
  .get(authControllers.protect, feedbackControllers.getFeedbacksByProductId);

module.exports = router;
