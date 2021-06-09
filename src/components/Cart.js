import React from "react";

export const Cart = (props) => {
  return (
    <>
      <div>
        {props.cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {props.cartItems.length} in the cart
          </div>
        )}
      </div>
      <div>
        <div className="cart">
          <ul className="cart-items">
            {props.cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    ${item.price} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => props.removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {props.cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total: ${" "}
                {props.cartItems.reduce((a, c) => a + c.price * c.count, 0)}
              </div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
