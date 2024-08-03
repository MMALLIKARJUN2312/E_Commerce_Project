import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/admin">Admin</Link>
    <Link to="/orders">Order History</Link>
  </nav>
);

export default Navbar;
