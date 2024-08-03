import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminProductForm from './AdminProductForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios('/api/products');
      setProducts(result.data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    await axios.delete(`/api/products/${productId}`);
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <AdminProductForm setProducts={setProducts} />
      <div className="admin-products">
        {products.map(product => (
          <div key={product.id} className="admin-product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
