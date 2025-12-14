import React, { useState } from 'react';
import ProductManagement from '../components/ProductManagement';
import OrderManagement from '../components/OrderManagement';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-tabs">
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'orders' && <OrderManagement />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
