const userControllers = require("../controllers/userControllers");

const express = require("express");
const router = express.Router();

router.route("/").post(userControllers.addNewUser);

router.route("/login").post(userControllers.login);

module.exports = router;
