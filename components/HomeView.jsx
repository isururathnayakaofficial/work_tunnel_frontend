import React from 'react';
import './css/HomeView.css';

const HomeView = ({ currentUser, todos, openAiChat, setCurrentView }) => {
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <div className="home-view">
      <div className="welcome-card">
        <h1>Hello, {currentUser.username}! 👋</h1>
        <p>You have {pendingCount} tasks pending today</p>
        <button className="btn-secondary" onClick={openAiChat}>
          🤖 Ask AI for suggestions
        </button>
      </div>

      <div className="home-grid">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Today's Tasks</h3>
            <p className="stat-value">{todos.length}</p>
            <p className="stat-label">Total tasks</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-value">{completedCount}</p>
            <p className="stat-label">Done today</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-value">{pendingCount}</p>
            <p className="stat-label">Remaining</p>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Access</h3>
          <button className="quick-btn" onClick={() => setCurrentView('todo')}>
            📝 View All Tasks
          </button>
          <button className="quick-btn" onClick={() => setCurrentView('dashboard')}>
            🧩 Install Extensions
          </button>
          <button className="quick-btn" onClick={openAiChat}>
            💡 Get Productivity Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;