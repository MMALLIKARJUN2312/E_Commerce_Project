import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios('/api/orders');
      setOrders(result.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
