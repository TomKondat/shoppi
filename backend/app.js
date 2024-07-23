const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productsRouter = require("./routes/product.Routes");
const usersRouter = require("./routes/user.Routes");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/shoppi/products", productsRouter);
app.use("/api/shoppi/users", usersRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "The requested route is not exist",
  });
});

module.exports = app;
