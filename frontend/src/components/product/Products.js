import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import "./products.css";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Metadata from "../layout/Metadata";
import { getAllCategories } from "../../actions/catAction";
import { CLEAR_ERRORS } from "../../constants/catConstant";


const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 60000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);


  const {
    error: catError,
    categoryList,
  } = useSelector((state) => state.allCategories);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (catError) {
      alert(catError);
      dispatch(CLEAR_ERRORS());
    }
    dispatch(getAllCategories());
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    error,
    catError,
    category,
    ratings,
  ]);

  const renderCategory = (category) => {
    const categories = [];
  
    for (let cat of category) {
      categories.push(
        <li onClick={() => setCategory(cat.name)} className="category-link" >
          {cat.name}
          {cat.children.length > 0 ? <ul><li onClick={() => setCategory(cat.name)} className="subCategory-link">{renderCategory(cat.children) }</li></ul> : null}
        </li>
      );
    }
  
    return categories;
  };

  // const Count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"PRODUCTS -- ECOMMERCE"} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={60000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {renderCategory(categoryList)}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => setRatings(newRatings)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
