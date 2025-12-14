import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = category ? `/products?category=${category}` : '/products';
      const response = await api.get(url);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Our Products</h1>
          <div className="category-filter">
            <button
              className={category === '' ? 'active' : ''}
              onClick={() => setCategory('')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'active' : ''}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">{error}</p>}

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {!loading && products.length === 0 && (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
