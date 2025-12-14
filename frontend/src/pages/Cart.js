import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      updateCartItem(itemId, quantity);
    }
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <p className="empty-cart">Your cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.product?.image} alt={item.product?.name} />
              <div className="item-details">
                <h3>{item.product?.name}</h3>
                <p className="item-price">${item.product?.price.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="item-total">
                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
