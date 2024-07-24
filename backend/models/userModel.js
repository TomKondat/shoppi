const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  password: { type: String, required: true },
});

const Uroduct = mongoose.model("User", userSchema);

module.exports = Uroduct;
