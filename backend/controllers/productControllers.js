const Product = require("./../models/productModel");

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, image, cat, quantity } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      price,
      cat,
      image,
      quantity,
    });

    res.status(201).json({
      status: "success",
      product: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const newProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
    });
    res.status(201).json({
      status: "success",
      newProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

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
