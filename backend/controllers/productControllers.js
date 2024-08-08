const APIMmethods = require("../utils/APImethods");
const Product = require("./../models/productModel");
const AppError = require("./../utils/AppError");
const factory = require("./factoryHandlers");
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

exports.getProductById = factory.getOne(Product);

exports.getProducts = factory.getAll(Product);

exports.editProductById = factory.editOne(Product);

exports.deleteProductById = factory.deleteOne(Product);
