const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/product.Routes");
const usersRouter = require("./routes/user.Routes");
const feedbacskRouter = require("./routes/feedback.Routes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/errorHandler");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Your frontend's origin
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/shoppi/products", productsRouter);
app.use("/api/shoppi/users", usersRouter);
app.use("/api/shoppi/feedbacks", feedbacskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(550, "The route can not be found"));
});

app.use(globalErrorHandler);

module.exports = app;
