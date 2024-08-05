const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    cat: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNGGjrfSqqv8UjL18xS4YypbK-q7po_8oVQ&s",
    },
    quantity: {
      type: Number,
      min: [0, "Minimum must be 0 or above"],
      deault: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("feedbacks", {
  ref: "Feedback",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre(/^findOne/, function (next) {
  this.populate("feedbacks");
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
