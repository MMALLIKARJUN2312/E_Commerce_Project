import React from 'react';
import './Product.css';

const Product = ({ product }) => (
  <div className="product">
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>${product.price}</p>
    <button>Add to Cart</button>
  </div>
);

export default Product;
