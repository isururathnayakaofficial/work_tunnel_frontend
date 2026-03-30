import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/AdminNavbar.css';
const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [

    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/admin', label: 'Admin' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/aistack', label: 'AI Stack' },
    { path: '/admin/feature', label: 'Feature' }

  ];

  return (
    <nav className="navbar">

      <div className="nav-brand">Admin Portal</div>
      <div className="nav-buttons">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-btn ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;