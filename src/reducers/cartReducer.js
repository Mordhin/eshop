import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

const defaultState = {cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")};

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {cartItems: action.payload.carItems};
    case REMOVE_FROM_CART:
      return {cartItems: action.payload.cartItems}
    default:
      return state;
  };
};