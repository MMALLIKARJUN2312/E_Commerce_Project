import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const result = await axios('/api/cart');
      setCart(result.data);
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await axios.delete(`/api/cart/${productId}`);
    setCart(cart.filter(item => item.product_id !== productId));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <p>{item.product_name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.total}</p>
              <button onClick={() => handleRemove(item.product_id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
