import React, { useState } from "react";
import { Cart } from "./components/Cart";
import { Filter } from "./components/Filter";
import { Products } from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
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

  const filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
  };

  const sortProducts = (event) => {
    console.log("event" + event.target.value);
    setSort(event.target.value);
    switch (event.target.value) {
      case "Lowest":
        console.log("1");
        setProducts((prevProducts) =>
          prevProducts.slice().sort((a, b) => (a.price > b.price ? 1 : -1))
        );
        break;
      case "Highest":
        console.log("2");
        setProducts((prevProducts) =>
          prevProducts.slice().sort((a, b) => (a.price < b.price ? 1 : -1))
        );
        break;
      default:
        console.log("3");
        setProducts((prevProducts) =>
          prevProducts.slice().sort((a, b) => (a._id > b._id ? 1 : -1))
        );
        break;
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">E-Shop</a>
      </header>
      <main className="content">
        <div className="main">
          <Filter
            count={products.length}
            size={size}
            sort={sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
          ></Filter>
          <Products products={products} addToCart={addToCart}></Products>
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
  );
};

export default App;
