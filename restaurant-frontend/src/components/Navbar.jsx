import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar">
      <div className="logo">🍹SpicyNest🔥</div>

      <ul className="nav-links">
        <li><a href="#home">🏠 Home</a></li>
        <li><a href="#about">ℹ️ About</a></li>
        <li><a href="#menu">📋 Menu</a></li>
        <li><a href="#contact">📞 Contact</a></li>
        <li><a href="#feedback">💬 Feedback</a></li>
      </ul>

      <div className="nav-auth-links">
        <Link to="/login">🔐 Login</Link>
        <Link to="/register">📝 Register</Link>
        <Link to="/admin">🛠️ Admin Panel</Link>
      </div>
    </nav>
  );
};

export default Navbar;
