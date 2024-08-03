import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import OrderHistory from './components/OrderHistory';
import './App.css';

const App = () => (
  <Router>
    <Navbar />
    <div className="app-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={ProductList} />
        <Route path="/cart" component={Cart} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/orders" component={OrderHistory} />
      </Switch>
    </div>
  </Router>
);

export default App;
