import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import React, { Fragment, useEffect } from "react";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearErrors, deleteReview, getAllReviews } from "../../actions/productAction";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const { error, reviews, loading } = useSelector((state) => state.allReviews);
  const {
    message,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.review);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const getProductReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      return alert(deleteError);
    }

    if (isDeleted) {
      alert(message);
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, history, message, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 220, flex: 0.5 },

    {
      field: "name",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 330,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <Fragment>
      <Metadata title={`ALL REVIEWS -- Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={getProductReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              GET REVIEWS
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <div className="productReviewsFormHeading">No Reviews Found</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
