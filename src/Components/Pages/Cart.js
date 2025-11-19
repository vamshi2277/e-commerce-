import React, { useContext, useState } from "react";
import { cartContext, productContext } from "../../App";
import "../../Styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { CartItems, removeFromCart } = useContext(cartContext);
  const { setProductDetails } = useContext(productContext);
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(
    CartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] + delta, 1),
    }));
  };

  const totalPrice = CartItems.reduce(
    (total, item) => total + item.price * (quantities[item.id] || 1),
    0
  );

  const handleProduct = (item) => {
    setProductDetails(item);
    navigate("/product");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Shopping Cart</h1>
      {CartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {CartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="cart-item-image"
                  onClick={() => handleProduct(item)}
                />
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={quantities[item.id] <= 1}
                    >
                      -
                    </button>
                    <span>Quantity: {quantities[item.id]}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-remove-button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              className="cart-checkout-button"
              onClick={() => {
                CartItems.forEach(item => {
                  console.log(
                    `Item ID: ${item.id}, Quantity: ${quantities[item.id]}, Total Price: ${totalPrice.toFixed(2)}`
                  );
                    removeFromCart(item.id);
                })
               
              }}
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
