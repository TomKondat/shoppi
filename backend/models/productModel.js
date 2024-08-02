const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  cat: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNGGjrfSqqv8UjL18xS4YypbK-q7po_8oVQ&s",
  },
  quantity: { type: Number, min: [0, "Minimum must be 0 or above"], deault: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
