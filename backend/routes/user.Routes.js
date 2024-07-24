const userControllers = require("../controllers/userControllers");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(userControllers.addNewUser)
  .get(userControllers.getUsers);

router.route("/:id").get(userControllers.getUserById);

module.exports = router;
