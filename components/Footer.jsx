import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="worktunnel-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Work Tunnel</h3>
            <p>Manage your day-to-day life with intelligent AI assistance.</p>
            <div className="social-links">
              {/* social icons */}
            </div>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Work Tunnel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;