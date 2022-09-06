const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls enter product Name"],
    maxlength: [30, "name cannot exceed 30 charactor"],
    minlength: [4, "name cannot less then 4 charactor"],
  },

  email: {
    type: String,
    required: [true, "pls enter product email"],
    unique: true,
    validate: [validator.isEmail, "plz Enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "pls enter product password"],
    minlength: [8, "password cannot less then 8 figure"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  creatAt: {
    type: Date,
    default: Date.now,
  },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token

usersSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generating reset password token
usersSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding resetPasswordToken to userschema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", usersSchema);
