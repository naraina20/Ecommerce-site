import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./newProduct.css";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { clearErrors, createProduct } from "../../actions/productAction";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";

import { CLEAR_ERRORS } from "../../constants/catConstant";
import { getAllCategories } from "../../actions/catAction";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {
    loading: catLoading,
    error: catError,
    categoryList,
  } = useSelector((state) => state.allCategories);

  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Grocery",
  //   "Stationary",
  //   "Cameras",
  //   "Smartphone",
  //   "Outfit",
  // ];


  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("desc", desc);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createCategoryList = (categories, options = []) => {
    if (!Array.isArray(categories)) return null;
    for (const cat of categories) {
      options.push({ value: cat._id, name: cat.name });
      if (cat.children.length > 0) {
        createCategoryList(cat.children, options);
      }
    }

    return options;
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (catError) {
      alert(catError);
      dispatch(CLEAR_ERRORS());
    }

    if (success) {
      alert("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    dispatch(getAllCategories());
  }, [dispatch, error, history, success, catError]);

  return (
    <Fragment>
      <Metadata title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                {categoryList &&
                  createCategoryList(categoryList).map((option) => (
                    <option key={option.value} value={option.name}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || catLoading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
