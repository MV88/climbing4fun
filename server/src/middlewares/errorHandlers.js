const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};

const errorMessages = {
  UniqueViolationError: 'Already exists.',
};
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200
    ? (errorTypes[error.name] || 500)
    : res.statusCode;
  console.log("error.message", error.message);
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === "production" ? "🍔" : error.stack,
    errors: error.errors || undefined,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};
