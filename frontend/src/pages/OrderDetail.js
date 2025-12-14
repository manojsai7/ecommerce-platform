import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        <h1>Order Details</h1>
        
        <div className="order-section">
          <h2>Order Information</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span className={`status-badge ${order.isPaid ? 'paid' : 'pending'}`}>
              {order.isPaid ? 'Paid' : 'Pending Payment'}
            </span>
            <span className={`status-badge ${order.isDelivered ? 'delivered' : 'pending'}`}>
              {order.isDelivered ? 'Delivered' : 'Processing'}
            </span>
          </p>
        </div>

        <div className="order-section">
          <h2>Shipping Address</h2>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="order-section">
          <h2>Order Items</h2>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item._id} className="order-item">
                <div className="item-info">
                  <img src={item.product?.image} alt={item.product?.name} />
                  <div>
                    <h3>{item.product?.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-section">
          <h2>Payment Summary</h2>
          <div className="payment-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
