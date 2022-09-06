const ErrorHandler = require("../utils/catcherror");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodule");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("plz login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id); //in getJWTToken (id: this._id) in usermodule file
  next();
});

exports.authorizeRoles = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          401
        )
      );
    }
    next();
  };
};
