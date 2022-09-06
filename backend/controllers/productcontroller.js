const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/catcherror");
const newProduct = require("../models/productmodule");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create a new product --->admin

exports.createnewproduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.name;

  const product = await newProduct.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// update the product ---> admin
exports.updateproduct = catchAsyncError(async (req, res, next) => {
  let product = await newProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await newProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// get all product

exports.getallproduct = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 7;
  const productsCount = await newProduct.countDocuments();

  const apiFeature = new ApiFeatures(newProduct.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // let products = await apiFeature.query;

  // let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  });
});

// get all product --Admin

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await newProduct.find();

  if (!products) {
    return next(new ErrorHandler("products are not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// get the product details

exports.getproductdetails = catchAsyncError(async (req, res, next) => {
  const product = await newProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

// get products by category

exports.getProductsByCat = catchAsyncError(async (req, res, next) => {
  const product = await newProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const products = await newProduct.find({category : product.category})

  if (!products) {
    return next(new ErrorHandler("products not found", 404));
  }

  res.status(201).json({
    success: true,
    products,
  });
});

//Delete the product --admin
exports.deleteproduct = catchAsyncError(async (req, res, next) => {
  const product = await newProduct.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  //Delete product images from cloudinary

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(201).json({
    success: true,
    message: "product is deleted successfully",
  });
});

//create new review or update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await newProduct.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all reviews

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await newProduct.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews : product.reviews
  });
});

//delete review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await newProduct.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await newProduct.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings: Number(ratings),
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
