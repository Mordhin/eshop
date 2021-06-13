import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state = {}, action) => {
  console.log('inside product reducer');
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {items: action.payload};
    default:
      return state;
  }
};