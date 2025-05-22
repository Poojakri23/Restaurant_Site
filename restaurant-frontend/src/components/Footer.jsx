import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          <h3>🍹SpicyNest🔥 Restaurant</h3>
          <p>Serving happiness one dish at a time 🍛</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
          <p className="copy">© 2025 🍹SpicyNest🔥. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
