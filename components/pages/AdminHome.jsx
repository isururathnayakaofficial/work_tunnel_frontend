import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import '../css/home.css';

const AdminHome = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />

      <main className="main-content">
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
      </main>
    </div>
  );
};

export default AdminHome;