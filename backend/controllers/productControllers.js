const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");

exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const products = await Product.findById(id);
  if (!products) return next(new AppError(400, "No product found"));
  res.status(200).json({
    status: "success",
    products,
  });
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    products,
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, image, cat, quantity } = req.body;
  console.log(req.body);
  console.log(`name: ${name}, price: ${price}, image: ${image}, cat: ${cat}`);

  const newProduct = await Product.create({
    name,
    price,
    image,
    cat,
    quantity,
  });
  console.log(newProduct);

  res.status(201).json({
    status: "success",
    newProduct,
  });
});

exports.editProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const newProduct = await Product.findByIdAndUpdate(id, {
    name,
    price,
  });
  res.status(201).json({
    status: "success",
    newProduct,
  });
});

exports.deleteProductById = (req, res) => {
  const { id } = req.params;
  if (id) {
    products = products.filter((product) => product.id != id);
    res.status(202).json({
      status: "success",
      product: null,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "fail delete product",
    });
  }
};
