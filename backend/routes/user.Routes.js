const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(authControllers.addNewUser)
  .get(userControllers.getUsers);

router.route("/login").post(authControllers.login);
router.route("/:id").get(userControllers.getUserById);

module.exports = router;
