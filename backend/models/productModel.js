const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  cat: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, min: [0, "Minimum must be 0 or above"], deault: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
