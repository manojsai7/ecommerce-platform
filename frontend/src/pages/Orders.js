import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders/myorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item._id} className="order-item">
                      <span>{item.product?.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-status">
                    <span className={`status-badge ${order.isPaid ? 'paid' : 'pending'}`}>
                      {order.isPaid ? 'Paid' : 'Pending Payment'}
                    </span>
                    <span className={`status-badge ${order.isDelivered ? 'delivered' : 'pending'}`}>
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                  <div className="order-total">
                    Total: <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <Link to={`/orders/${order._id}`} className="view-order-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
