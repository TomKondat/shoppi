const APIMmethods = require("../utils/APImethods");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");

const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image"))
    cb(new AppError(404, "The file is not type image"), false);
  else cb(null, true);
};
const upload = multer({ memoryStorage, fileFilter });

exports.uploadProductImage = upload.single("image");

// exports.editAndResizeImage = (id) => (req, res, next) => {
//   const productId = req.body.productId;
//   const fileName = `product-${Date.now()}-${id}.jpeg`;
//   sharp(req.file.buffer)
//     .resize(300, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 80 })
//     .toFile(`public/img/products/${fileName}`);
//   next();
// };

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
  const apiMethods = new APIMmethods(Product.find(), req.query);
  apiMethods.filter().sort().selectFields().makePagination();

  const products = await apiMethods.query;
  res.status(200).json({
    status: "success",
    products,
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  console.log(req.file);

  const newProduct = await Product.create(req.body);
  if (req.file) {
    const fileName = `product-${Date.now()}-${newProduct._id}.jpg`;

    sharp(req.file.buffer)
      .resize(500, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/img/products/${fileName}`);
    newProduct.image = `img/products/${fileName}`;
    await newProduct.save();
  }
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
