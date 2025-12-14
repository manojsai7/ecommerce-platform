import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [clientSecret, setClientSecret] = useState('');

  if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <p style={{ color: 'red', padding: '2rem' }}>
            Payment system is not configured. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/orders/payment-intent', {
        amount: getCartTotal()
      });
      setClientSecret(response.data.clientSecret);
      setStep(2);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      const orderData = {
        items: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod: 'stripe'
      };

      const orderResponse = await api.post('/orders', orderData);
      const orderId = orderResponse.data._id;

      await api.put(`/orders/${orderId}/pay`, {
        id: paymentResult.paymentIntent.id,
        status: paymentResult.paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: paymentResult.paymentIntent.receipt_email
      });

      await clearCart();
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
        </div>

        {step === 1 && (
          <form onSubmit={handleShippingSubmit} className="shipping-form">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="continue-btn">
              Continue to Payment
            </button>
          </form>
        )}

        {step === 2 && clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm onSuccess={handlePaymentSuccess} amount={getCartTotal()} />
          </Elements>
        )}

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.items.map((item) => (
            <div key={item._id} className="summary-item">
              <span>{item.product?.name} x {item.quantity}</span>
              <span>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
