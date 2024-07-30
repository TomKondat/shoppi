const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncHandler = require("express-async-handler");
const sendEmail = require("./../utils/email");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, role, age, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return next(new AppError(403, "Please fill all the fields"));

  const newUser = await User.create({
    username,
    email,
    role,
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
  if (!email || !password) {
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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "None",
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    secure: true,
  });
  // send token to client
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("jwt");
  res.cookie("jwt", "", {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    expires: new Date(0),
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  console.log(req.cookies);

  console.log("protect");
  //extract token from req.headers or cookies
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, "You are not logged in"));
  const token = req.cookies.jwt;
  console.log(token);

  //verify token and extract payload data id
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  if (!decoded || !decoded.exp >= Date.now() / 1000)
    return next(new AppError(403, "Please login"));

  //find user by id
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(404, "Please login user"));

  //upload user data to req object
  req.user = user;
  console.log(req.user);

  //check if user role is premium

  // if (req.user.role !== "premium" && req.user.role !== "admin")
  //   return next(
  //     new AppError(403, "Please upgrade to premium to access this feature")
  //   );

  //go to the next function
  next();
});

//spesific restriction
exports.restrictBypremium = (req, res, next) => {
  if (req.user.role != "premium")
    return next(
      new AppError(403, "You are not allowed to access this feature")
    );
  next();
};

//general restriction (buged!!!!)
exports.restrictByRole = (...allowedRoles) => {
  console.log(`allowedRoles: ${allowedRoles}`);

  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      return next(
        new AppError(403, "You are not allowed to access this feature")
      );
    next();
  };
};

//forgot password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError(401, "Please provide email"));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError(404, "User not found"));

  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);
  const hashedPasswordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = hashedPasswordResetToken;
  console.log(`user.passwordResetToken: ${user.passwordResetToken}`);
  user.passwordResetExpires = Date.now() + 5 * 60 * 100;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/shoppi/users/resetPassword/${resetToken}`;
  console.log(resetUrl);

  //send email
  const mailOptions = {
    from: "Shoppi <donotreplay@shoppi.com",
    to: user.email,
    subject: "Reset your password",
    text: `Follow this link: ${resetUrl}`,
  };
  try {
    await sendEmail(mailOptions);
    res.status(200).json({
      status: "success",
      message: "The password reset link has been sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(401, "There was an error sending the email. Try again later")
    );
  }
});
