const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");
const routes = require('./src/api');
const { API } = require('./src/constants/project');

const app = express();

app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: API,
  });
});

app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

// todo add error handler

module.exports = app;
