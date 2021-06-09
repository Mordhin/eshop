import React, { useState } from "react";
import { Products } from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="grid-container">
      <header>
        <a href="/">E-Shop</a>
      </header>
      <main className="content">
        <div className="main">
          <Products products={products}></Products>
        </div>
        <div className="sidebar">Cart Items</div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
