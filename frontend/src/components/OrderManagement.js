import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/deliver`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>{order.user?.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <span className={`status ${order.isPaid ? 'success' : 'pending'}`}>
                    {order.isPaid ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={`status ${order.isDelivered ? 'success' : 'pending'}`}>
                    {order.isDelivered ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  {order.isPaid && !order.isDelivered && (
                    <button 
                      onClick={() => handleDeliverOrder(order._id)}
                      className="deliver-btn"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
