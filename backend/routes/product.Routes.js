const productControllers = require("./../controllers/productControllers");
const authControllers = require("./../controllers/authControllers");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(productControllers.getProducts)
  .post(
    authControllers.protect,
    authControllers.restrictByPremuim,
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productControllers.getProductById)
  .patch(productControllers.editProductById)
  .delete(productControllers.deleteProductById);

module.exports = router;
