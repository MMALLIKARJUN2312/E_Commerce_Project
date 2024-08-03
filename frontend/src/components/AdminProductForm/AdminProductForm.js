import React, { useState } from 'react';
import axios from 'axios';
import './AdminProductForm.css';

const AdminProductForm = ({ setProducts }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await axios.post('/api/products', form);
    setProducts(products => [...products, result.data]);
    setForm({
      name: '',
      description: '',
      price: '',
      stock: ''
    });
  };

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AdminProductForm;
