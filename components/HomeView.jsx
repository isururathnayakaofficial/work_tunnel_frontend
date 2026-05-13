import React from 'react';
import './css/HomeView.css';

const HomeView = ({ currentUser, todos, openAiChat, setCurrentView }) => {
  const safeTodos = Array.isArray(todos) ? todos : [];
  const completedCount = safeTodos.filter((t) => t.completed).length;
  const totalCount = safeTodos.length;
  const pendingCount = totalCount - completedCount;

  const chartSize = 180;
  const strokeWidth = 16;
  const radius = (chartSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const completedRatio = totalCount > 0 ? completedCount / totalCount : 0;
  const completedArc = completedRatio * circumference;
  const completionPercent = totalCount > 0 ? Math.round(completedRatio * 100) : 0;

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
            <p className="stat-value">{totalCount}</p>
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

        <div className="progress-card">
          <h3>Task Completion Overview</h3>
          <div className="progress-chart-wrap">
            <svg
              className="progress-donut"
              width={chartSize}
              height={chartSize}
              viewBox={`0 0 ${chartSize} ${chartSize}`}
              role="img"
              aria-label={`Completed ${completedCount} out of ${totalCount} tasks`}
            >
              <circle
                className="progress-donut-track"
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <circle
                className="progress-donut-segment"
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${completedArc} ${circumference - completedArc}`}
              />
            </svg>
            <div className="progress-center-text">
              <span className="progress-percent">{completionPercent}%</span>
              <span className="progress-caption">Done</span>
            </div>
          </div>

          <div className="progress-legend">
            <div className="legend-item">
              <span className="legend-dot legend-dot-completed" />
              <span>Completed: {completedCount}</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-dot-pending" />
              <span>Remaining: {pendingCount}</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-dot-total" />
              <span>Total: {totalCount}</span>
            </div>
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