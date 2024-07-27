const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productsRouter = require("./routes/product.Routes");
const usersRouter = require("./routes/user.Routes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/errorHandler");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/shoppi/products", productsRouter);
app.use("/api/shoppi/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(550, "The route can not be found"));
});

app.use(globalErrorHandler);

module.exports = app;
