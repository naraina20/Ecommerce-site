import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard";
import Metadata from "../layout/Metadata";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="HOME -- Urban-nest" />
          <div className="banner">
            <p>welcome to Urban-nest</p>
            <h1>FIND AMAZING RPODUCTS BELOW</h1>

              
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
              {products &&
                products.map((product) => <Product key={product._id} product={product} />)}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
