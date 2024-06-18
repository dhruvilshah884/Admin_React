import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Dhruvil App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
            <li className="nav-item">
              <Link to="/table" className="nav-link">Admin Table</Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link">User</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to="/userData" className="nav-link">UserData</Link>
            </li>
            <li className="nav-item">
              <Logout />
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
