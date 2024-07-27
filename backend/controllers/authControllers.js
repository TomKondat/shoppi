const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");

exports.addNewUser = asyncHandler(async (req, res, next) => {
  const { username, email, age, password, confirmPassword } = req.body;
  if (!username || !email || !age || !password || !confirmPassword)
    return next(new AppError(403, "Please fill all the fields"));

  const newUser = await User.create({
    username,
    email,
    age,
    password,
    confirmPassword,
  });
  res.status(201).json({
    status: "success",
    newUser,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  if (!email || !password) {
    console.log(`email: ${email}, password: ${password}`);

    return next(new AppError(403, "Please provide email and password"));
  }
  //find user by email
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) return next(new AppError(404, "User not found"));
  // check the password
  if (!(await user.checkPassword(password, user.password))) {
    console.log(`password: ${password}, user.password: ${user.password}`);
    return next(new AppError(403, "Email or password is incorrect"));
  }
  // generate token
});
