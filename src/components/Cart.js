import React, { useState } from "react";
import {connect} from 'react-redux';
import Fade from 'react-reveal/Fade';
import { removeFromCart } from "../actions/cartActions";

  const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState("");
  const [alias, setAlias] = useState("");
  const [address, setAddress] = useState("");

  const handleInput = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "name":
        setAlias(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      default:
        break;
    }
  };

  const createOrder = (event) => {
    event.preventDefault();
    const order = {
      name: alias,
      email: email,
      address: address,
      cartItems: props.cartItems,
    };
    props.createOrder(order);
  };

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
          <Fade left cascade>
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
          </Fade>
        </div>
        {props.cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total: ${" "}
                  {props.cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default connect((state) => ({
  cartItems: state.cart.cartItems,
}),
{removeFromCart}
)(Cart);