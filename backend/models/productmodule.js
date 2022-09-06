const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls enter product Name"],
    trim: true,
    ref: "name"
  },
  desc: {
    type: String,
    required: [true, "pls enter product description"],
  },
  price: {
    type: Number,
    required: [true, "pls enter product price"],
    maxlength: [4, "price cannot exceed 4 figures"],
  },
  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Pls Enter product category"],
  },

  stock: {
    type: Number,
    required: [true, "Pls Enter product stock"],
    maxlength: [4, "stock cannot exceed 4 figure"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: String,
    ref: "user",
    required: true,
  },

  creatAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("newProduct", productschema);
