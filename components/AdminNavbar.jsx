import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Destructure for simplicity

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/admin', label: 'Admin' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/aistack', label: 'AI Stack' },
    { path: '/admin/feature', label: 'Feature' }
  ];

  const handleNavigate = (path) => {
    if (pathname !== path) navigate(path); // Avoid unnecessary re-renders
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Admin Portal</div>
      <ul className="nav-buttons">
        {navItems.map((item) => (
          <li key={item.path}>
            <button
              className={`nav-btn ${pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavbar;