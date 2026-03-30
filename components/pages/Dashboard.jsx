// Dashboard.jsx
import React from 'react';
import '../css/Dashboard.css';
import AdminNavbar from '../AdminNavbar';

// Mock data – replace with actual API calls
const dashboardData = {
  adminCount: 5,
  usersCount: 128,
  aiUsersCount: 42,
  recentActivities: [
    { id: 1, action: 'User John Doe registered', timestamp: '2 mins ago' },
    { id: 2, action: 'AI Stack updated', timestamp: '1 hour ago' },
    { id: 3, action: 'New admin added: Jane Smith', timestamp: '3 hours ago' },
    { id: 4, action: 'Feature "Analytics" enabled', timestamp: 'yesterday' },
    { id: 5, action: 'User Mike Johnson deleted', timestamp: '2 days ago' },
  ],
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <AdminNavbar/>
      <h1 className="dashboard-title">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="cards-grid">
        <div className="card">
          <h3>Total Admins</h3>
          <p className="card-number">{dashboardData.adminCount}</p>
          <span className="card-icon">👥</span>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p className="card-number">{dashboardData.usersCount}</p>
          <span className="card-icon">👤</span>
        </div>
        <div className="card">
          <h3>AI Stack Users</h3>
          <p className="card-number">{dashboardData.aiUsersCount}</p>
          <span className="card-icon">🤖</span>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {dashboardData.recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <p className="activity-action">{activity.action}</p>
              <span className="activity-time">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;