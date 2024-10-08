const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");

const express = require("express");
const router = express.Router();

router.route("/").get(userControllers.getUsers);

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

router.post("/forgotPassword", authControllers.forgotPassword);
router.post("/resetPassword/:plainResetToken", authControllers.resetPassword);

router.route("/logout").delete(authControllers.logout);
router.route("/:id").get(userControllers.getUserById);

module.exports = router;
