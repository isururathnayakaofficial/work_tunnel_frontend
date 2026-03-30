// AdminHome.jsx
import React, { useState } from 'react';
import './css/home.css';
import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'admin', label: 'Admin' },
    { id: 'users', label: 'Users' },
    { id: 'aiStack', label: 'AI Stack' },
    { id: 'feature', label: 'Feature' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="content-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>1,234</p>
              </div>
              <div className="stat-card">
                <h3>Active Sessions</h3>
                <p>87</p>
              </div>
              <div className="stat-card">
                <h3>AI Requests</h3>
                <p>4,521</p>
              </div>
              <div className="stat-card">
                <h3>System Health</h3>
                <p>98%</p>
              </div>
            </div>
          </div>
        );
      case 'admin':return <Navigate to="/admin/Home" />;
      case 'users':
        return (
          <div className="content-section">
            <h2>User Management</h2>
            <p>View, edit, and manage all registered users.</p>
            <div className="user-list">
              <div className="user-item">
                <span>john.doe@example.com</span>
                <span className="user-role">Admin</span>
              </div>
              <div className="user-item">
                <span>jane.smith@example.com</span>
                <span className="user-role">Editor</span>
              </div>
              <div className="user-item">
                <span>alex.johnson@example.com</span>
                <span className="user-role">Viewer</span>
              </div>
            </div>
          </div>
        );
      case 'aiStack':
        return (
          <div className="content-section">
            <h2>AI Stack Integration</h2>
            <p>Monitor and configure AI services, models, and usage analytics.</p>
            <div className="ai-metrics">
              <div className="metric">
                <span className="metric-label">LLM API Calls</span>
                <span className="metric-value">12.4k</span>
              </div>
              <div className="metric">
                <span className="metric-label">Avg Latency</span>
                <span className="metric-value">243ms</span>
              </div>
              <div className="metric">
                <span className="metric-label">Token Usage</span>
                <span className="metric-value">2.1M</span>
              </div>
            </div>
          </div>
        );
      case 'feature':
        return (
          <div className="content-section">
            <h2>Feature Flags</h2>
            <p>Toggle and manage experimental features and release candidates.</p>
            <div className="feature-list">
              <label className="feature-toggle">
                <input type="checkbox" /> Enable Beta Dashboard
              </label>
              <label className="feature-toggle">
                <input type="checkbox" /> New Analytics Engine
              </label>
              <label className="feature-toggle">
                <input type="checkbox" /> AI-Powered Recommendations
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="nav-brand">Admin Portal</div>
        <div className="nav-buttons">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminHome;