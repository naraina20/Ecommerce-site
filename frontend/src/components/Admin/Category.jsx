import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getAllCategories } from "../../actions/catAction";
import { CLEAR_ERRORS } from "../../constants/catConstant";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AccountTreeIcon from "@mui/icons-material/AccountTree";


const Category = () => {
  const dispatch = useDispatch();

  const { loading, error, categoryList } = useSelector(
    (state) => state.allCategories
  );

  const [category, setCategory] = useState("");
  const [parentId, setParentId] = useState("");

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

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myform = new FormData();

    myform.set("name", category)
    myform.set("parentId", parentId)

    
    dispatch(createCategory(myform));

    setCategory("");
    setParentId("");
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(CLEAR_ERRORS());
    }

    dispatch(getAllCategories());
  }, [dispatch, error]);

  return (
    <Fragment>
      <Metadata title="Create Category" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
            style={{ height: "45%" }}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option>Select Category</option>
                {categoryList &&
                  createCategoryList(categoryList).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || !category ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
