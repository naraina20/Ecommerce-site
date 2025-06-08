import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import { clearErrors, getProductDetails, getSameCatProducts, newReview } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import Loader from "../layout/Loader/Loader";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "./ReviewCard";
import Metadata from "../layout/Metadata";
import { addItemToCart } from "../../actions/cartAction";
import {
  Dialog,
  
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { CREATE_REVIEW_RESET } from "../../constants/productConstants";
import ProductCard from "../Home/ProductCard";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
    setComment("")
    setRating("")
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qnt = quantity + 1;
    setQuantity(qnt);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qnt = quantity - 1;
    setQuantity(qnt);
  };

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert("product add to cart successfully");
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { products, loading : productsLoading, error:productsError  } = useSelector(
    (state) => state.products
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      return alert(reviewError);
    }

    if (productsError) {
      return alert(productsError);
    }

    if (success) {
      alert("Your Review successfully submited");
      dispatch({ type: CREATE_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
    dispatch(getSameCatProducts(match.params.id))
  }, [dispatch, match.params.id, error, reviewError, success, productsError]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0,1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} -- Urban-nest`} />
          <div className="productDetails">
            <div className="productSlider">
              <Carousel
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="styleSlider.custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                className="carouselDiv"
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                      height="400px"
                      width="300px"
                      loading="lazy"
                    />
                  ))}
              </Carousel>
            </div>

            <div className="productDetails-1">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews}) Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addItemToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>

                <p>
                  Status:{""}
                  <b style={{color : product.stock < 1 ? "red" : "green"}}>
                    {product.stock < 1 ? "OutOfStock" : "inStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.desc}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <div className="noReviews">No Reviews yet</div>
            )}
            

            <h3 className="reviewsHeading">Similar products</h3>
            <div className="products">
            { !productsLoading ?  products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              )) : null}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
