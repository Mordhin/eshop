import React, { useState } from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import store from './store'

const App = () => {
  return (
    <Provider store = {store}>
      <div className="grid-container">
        <header>
          <a href="/">E-Shop</a>
        </header>
        <main className="content">
          <div className="main">
            <Filter></Filter>
            <Products></Products>
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    </Provider>
  );
};

export default App;
