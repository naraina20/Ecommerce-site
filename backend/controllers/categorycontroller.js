const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/catcherror");
const Category = require("../models/categorymodule");
const { default: slugify } = require("slugify");


const arrangeCategories = (categories, parentId = null) => {

    let category;

    const categoryList = [];
    
    if (parentId == null) {
        category = categories.filter(cate => cate.parentId == undefined);
    } else {
        category = categories.filter(cate => cate.parentId == parentId)
    }

    for (let cate of category) {

        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: arrangeCategories(categories, cate._id)
        })
    }

    return categoryList;
}

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(201).json({
        success: true,
        category,
      });
    }
  });
});

exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler("categories not found", 404));
  }

    const categoryList = arrangeCategories(categories)
    
    if (!categoryList) {
      return next(new ErrorHandler("categoryList not found", 404));
  }
  
    res.status(200).json({
        success: true,
        categoryList
    })
 
});
