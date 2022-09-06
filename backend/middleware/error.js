const ErrorHandler = require("../utils/catcherror");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //wrong mongodb id error
  if (err.name === "cast Error") {
    const message = `Resaurce not found. Invalid: ${err.path}`
    err = new ErrorHandler(message, 400);
  }
  
  // mongodb duplicate key error
  if (err.code === "E11000" ) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT Token error
  if (err.name === "JsonWebTokenerror") {
    const message = `Json web Token is invalid, pls try again`
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT Token expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is Expired, pls try again`
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
  })
};
