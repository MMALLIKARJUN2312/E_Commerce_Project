import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios('/api/products');
      setProducts(result.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
