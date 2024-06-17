import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-logo">My App</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
        <Link to="/user" className="nav-link">User</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
