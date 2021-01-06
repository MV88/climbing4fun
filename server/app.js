const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const notFound = require("./src/api/middlewares/notFound");
const errorHandler = require("./src/api/middlewares/errorHandler");

const app = express();

app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Climbing for fun",
  });
});

app.use(notFound);
app.use(errorHandler);

// todo add error handler

module.exports = app;
