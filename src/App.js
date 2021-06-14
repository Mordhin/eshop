import React, { useState } from "react";
import { Provider } from "react-redux";
import { Cart } from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from './store'

const App = () => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const createOrder = (order) => {
    alert("Need to save order for" + order.name);
  };

  const removeFromCart = (product) => {
    const newCartItems = cartItems
      .slice()
      .filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const addToCart = (product) => {
    let alreadyInCart = false;
    const newCartItems = cartItems.slice();
    newCartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      newCartItems.push({ ...product, count: 1 });
    }
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return (
    <Provider store = {store}>
      <div className="grid-container">
        <header>
          <a href="/">E-Shop</a>
        </header>
        <main className="content">
          <div className="main">
            <Filter></Filter>
            <Products addToCart={addToCart}></Products>
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </Provider>
  );
};

export default App;
