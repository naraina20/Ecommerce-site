import axios from "axios";

import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/catConstant";

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/v1/categories");
    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data.categoryList,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createCategory = (mydata) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    console.log(mydata);

    const { data } = await axios.post("/api/v1/category/new", mydata, config);

    console.log(data);
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
