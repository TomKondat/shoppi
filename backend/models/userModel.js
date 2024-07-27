const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true["The user must have an email"],
    validate: {
      validator: function () {
        return validator.isEmail(this.email);
      },
    },
  },
  age: { type: Number },
  password: {
    type: String,
    minLength: [8, "8 characthers or above"],
    select: false,
    required: [true, "The user must have a password"],
  },
  confirmPassword: {
    type: String,
    minLength: [8, "8 characthers or above"],
    required: [true, "The user must retype the password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.checkPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
