import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  allReviewsReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  ResetPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  getOrderDetailsReducer,
  myOrdersReducer,
  newOrderReducer,
  orderReducer,
} from "./reducers/orderReducer";
import { allCategoriesReducer, newCategoryReducer } from "./reducers/catReducer";

const reducer = combineReducers({
  
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,

  cart: cartReducer,
  
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: getOrderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  
  forgotPassword: forgotPasswordReducer,
  ResetPassword: ResetPasswordReducer,
  profile: profileReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails : userDetailsReducer,

  newReview: newReviewReducer,
  allReviews: allReviewsReducer,
  review: reviewReducer,

  allCategories: allCategoriesReducer,
  newCategory : newCategoryReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
