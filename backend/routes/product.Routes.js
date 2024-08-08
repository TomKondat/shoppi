const productControllers = require("./../controllers/productControllers");
const authControllers = require("./../controllers/authControllers");
const feedbacskRouter = require("./feedback.Routes");

const express = require("express");
const router = express.Router();
router.use("/:productId/feedbacks", feedbacskRouter);

router.route("/").get(productControllers.getProducts).post(
  authControllers.protect,
  authControllers.restrictByRole("premium", "admin"),
  productControllers.uploadProductImage,
  // productControllers.editAndResizeImage,
  productControllers.createProduct
);

router
  .route("/:id")
  .get(productControllers.getProductById)
  .patch(productControllers.editProductById)
  .delete(productControllers.deleteProductById);

module.exports = router;
