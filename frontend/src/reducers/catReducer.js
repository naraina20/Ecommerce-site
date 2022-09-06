import {
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  CLEAR_ERRORS,
} from "../constants/catConstant";

export const allCategoriesReducer = (state = { categoryList: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
      };
    case ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
          return state;
  }
};

export const newCategoryReducer = (state = { newCategory: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORY_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
          return state;
  }
};
