import React from "react";

export const Products = (props) => {
  return (
    <div>
      <ul className="products">
        {props.products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <a href={"#" + product._id}>
                <img src={product.image} alt="product image"></img>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                <div>$ {product.price}</div>
                <button className="button primary">Add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};