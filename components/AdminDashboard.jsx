import React, { useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from './js/authService';
import '../components/css/AdminDashboard.css';

function AdminDashboard() {
  const [authState, setAuthState] = useState('login'); // 'login', 'signup', 'dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'ai-search', 'watch-panel', 'distraction'
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [userDistractionLevels, setUserDistractionLevels] = useState({});

  const loadUsers = () => {
    try {
      const response = localStorage.getItem('wt_users');
      const allUsers = JSON.parse(response || '[]');
      setUsers(allUsers);
      
      // Generate stable distraction levels for each user
      const levels = {};
      allUsers.forEach((user, idx) => {
        levels[user.id] = 30 + (idx * 7) % 50;
      });
      setUserDistractionLevels(levels);
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  useEffect(() => {
    const setupDashboard = () => {
      const user = getCurrentUser();
      if (user?.role === 'admin') {
        setCurrentUser(user);
        setAuthState('dashboard');
        loadUsers();
      }
    };
    setupDashboard();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = loginUser(email, password);
      if (user.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        return;
      }
      setCurrentUser(user);
      setAuthState('dashboard');
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const adminKey = e.target.adminKey.value;

    try {
      const user = registerUser({ name, email, password, role: 'admin', adminKey });
      setCurrentUser(user);
      setAuthState('dashboard');
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthState('login');
    setActiveTab('users');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (!currentUser) {
    return (
      <div className={`admin-container ${isDark ? 'dark-theme' : ''}`}>
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Work Tunnel</h1>
              <p>Admin Control Center</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {authState === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <h2>Admin Login</h2>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@worktunnel.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Login
                </button>
                <p className="auth-switch">
                  Don't have an admin account?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setAuthState('signup');
                      setError('');
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <h2>Create Admin Account</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@worktunnel.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adminKey">Admin Key</label>
                  <input
                    id="adminKey"
                    type="password"
                    placeholder="Enter admin key"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Sign Up
                </button>
                <p className="auth-switch">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setAuthState('login');
                      setError('');
                    }}
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

            <div className="theme-toggle-auth">
              <button onClick={toggleTheme} className="theme-btn">
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-container ${isDark ? 'dark-theme' : ''}`}>
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <h1>Work Tunnel Admin</h1>
        </div>
        <div className="header-right">
          <button onClick={toggleTheme} className="theme-btn">
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="user-info">
            <span className="user-badge">{currentUser.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <nav className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Watch Users
          </button>
          <button
            className={`tab-btn ${activeTab === 'ai-search' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-search')}
          >
            🔍 AI Search
          </button>
          <button
            className={`tab-btn ${activeTab === 'watch-panel' ? 'active' : ''}`}
            onClick={() => setActiveTab('watch-panel')}
          >
            📊 Watch Panel
          </button>
          <button
            className={`tab-btn ${activeTab === 'distraction' ? 'active' : ''}`}
            onClick={() => setActiveTab('distraction')}
          >
            ⚠️ Distraction Map
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Watch Users Tab */}
        {activeTab === 'users' && (
          <section className="tab-content">
            <h2>User Management</h2>
            <div className="users-grid">
              <div className="stats-summary">
                <div className="stat-card">
                  <span className="stat-number">{users.length}</span>
                  <span className="stat-label">Total Users</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{users.filter(u => u.role === 'admin').length}</span>
                  <span className="stat-label">Admins</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{users.filter(u => u.role === 'user').length}</span>
                  <span className="stat-label">Regular Users</span>
                </div>
              </div>

              <div className="users-table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created At</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.createdAt || 'N/A'}</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* AI Search Tab */}
        {activeTab === 'ai-search' && (
          <section className="tab-content">
            <h2>AI Search Database</h2>
            <div className="ai-search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search database... (e.g., user behaviors, patterns, issues)"
                  className="search-input"
                />
                <button className="btn-search">🔍 Search</button>
              </div>

              <div className="search-filters">
                <select className="filter-select">
                  <option>All Categories</option>
                  <option>User Activity</option>
                  <option>Performance Metrics</option>
                  <option>Error Logs</option>
                  <option>User Feedback</option>
                </select>
                <input type="date" className="filter-date" />
              </div>

              <div className="search-results">
                <div className="result-card">
                  <h4>Search Results</h4>
                  <p className="placeholder-text">
                    📌 Type a query to search your database. AI will analyze patterns and provide insights.
                  </p>
                  <ul className="sample-queries">
                    <li>✓ Find users with high distraction rates</li>
                    <li>✓ Search productivity patterns</li>
                    <li>✓ Analyze work session data</li>
                    <li>✓ Review user feedback and issues</li>
                  </ul>
                </div>

                <div className="ai-insights">
                  <h4>AI Insights</h4>
                  <div className="insight-item">
                    <span className="insight-label">Most Common Issue:</span>
                    <span className="insight-value">Notification Distractions</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-label">Average Productivity:</span>
                    <span className="insight-value">78%</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-label">Active Sessions:</span>
                    <span className="insight-value">{users.filter(u => u.role === 'user').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Watch Panel Tab */}
        {activeTab === 'watch-panel' && (
          <section className="tab-content">
            <h2>Real-time Watch Panel</h2>
            <div className="watch-panel">
              <div className="panel-grid">
                <div className="panel-card">
                  <h4>Live Users</h4>
                  <div className="live-indicator">
                    <span className="pulse"></span> 0 Users Online
                  </div>
                  <ul className="user-list-small">
                    {users.slice(0, 5).map((user) => (
                      <li key={user.id} className="user-item">
                        <span className="user-avatar">{user.name.charAt(0)}</span>
                        <span className="user-name">{user.name}</span>
                        <span className="connection-status">●</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel-card">
                  <h4>Activity Monitor</h4>
                  <div className="activity-chart">
                    <div className="chart-bar">
                      <div className="bar-fill" style={{ height: '65%' }}></div>
                      <span className="chart-label">Today</span>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-fill" style={{ height: '42%' }}></div>
                      <span className="chart-label">Yesterday</span>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-fill" style={{ height: '78%' }}></div>
                      <span className="chart-label">This Week</span>
                    </div>
                  </div>
                </div>

                <div className="panel-card">
                  <h4>System Health</h4>
                  <div className="health-indicator">
                    <div className="health-item">
                      <span>CPU</span>
                      <div className="health-bar">
                        <div className="health-fill good" style={{ width: '35%' }}></div>
                      </div>
                      <span className="health-value">35%</span>
                    </div>
                    <div className="health-item">
                      <span>Memory</span>
                      <div className="health-bar">
                        <div className="health-fill good" style={{ width: '52%' }}></div>
                      </div>
                      <span className="health-value">52%</span>
                    </div>
                    <div className="health-item">
                      <span>Database</span>
                      <div className="health-bar">
                        <div className="health-fill excellent" style={{ width: '8%' }}></div>
                      </div>
                      <span className="health-value">8%</span>
                    </div>
                  </div>
                </div>

                <div className="panel-card">
                  <h4>Alerts</h4>
                  <div className="alerts-list">
                    <div className="alert-item alert-info">
                      <span className="alert-icon">ℹ️</span>
                      <span className="alert-text">System running smoothly</span>
                    </div>
                    <div className="alert-item alert-warning">
                      <span className="alert-icon">⚠️</span>
                      <span className="alert-text">Peak hours approaching</span>
                    </div>
                    <div className="alert-item alert-success">
                      <span className="alert-icon">✓</span>
                      <span className="alert-text">All services operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Distraction Mapping Tab */}
        {activeTab === 'distraction' && (
          <section className="tab-content">
            <h2>Distraction Mapping & Analysis</h2>
            <div className="distraction-container">
              <div className="distraction-map">
                <h3>Distraction Sources Breakdown</h3>
                <div className="map-grid">
                  <div className="distraction-item high">
                    <span className="dist-icon">📱</span>
                    <span className="dist-name">Phone Notifications</span>
                    <span className="dist-percentage">45%</span>
                  </div>
                  <div className="distraction-item medium">
                    <span className="dist-icon">💬</span>
                    <span className="dist-name">Chat Messages</span>
                    <span className="dist-percentage">28%</span>
                  </div>
                  <div className="distraction-item medium">
                    <span className="dist-icon">🌐</span>
                    <span className="dist-name">Social Media</span>
                    <span className="dist-percentage">18%</span>
                  </div>
                  <div className="distraction-item low">
                    <span className="dist-icon">📧</span>
                    <span className="dist-name">Email</span>
                    <span className="dist-percentage">9%</span>
                  </div>
                </div>
              </div>

              <div className="distraction-trends">
                <h3>Distraction Trends</h3>
                <div className="trend-chart">
                  <div className="trend-row">
                    <span className="trend-label">Morning (6-10 AM)</span>
                    <div className="trend-bar-container">
                      <div className="trend-bar" style={{ width: '35%' }}>35%</div>
                    </div>
                  </div>
                  <div className="trend-row">
                    <span className="trend-label">Midday (10 AM-2 PM)</span>
                    <div className="trend-bar-container">
                      <div className="trend-bar" style={{ width: '62%' }}>62%</div>
                    </div>
                  </div>
                  <div className="trend-row">
                    <span className="trend-label">Afternoon (2-6 PM)</span>
                    <div className="trend-bar-container">
                      <div className="trend-bar" style={{ width: '48%' }}>48%</div>
                    </div>
                  </div>
                  <div className="trend-row">
                    <span className="trend-label">Evening (6-10 PM)</span>
                    <div className="trend-bar-container">
                      <div className="trend-bar" style={{ width: '72%' }}>72%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mitigation-strategies">
                <h3>Recommended Mitigation Strategies</h3>
                <div className="strategy-list">
                  <div className="strategy-card">
                    <h4>🔕 Notification Management</h4>
                    <p>Implement do-not-disturb schedules during peak work hours</p>
                  </div>
                  <div className="strategy-card">
                    <h4>⏱️ Focus Sessions</h4>
                    <p>Encourage 25-50 minute focused work blocks (Pomodoro)</p>
                  </div>
                  <div className="strategy-card">
                    <h4>🎯 Goal Setting</h4>
                    <p>Help users set daily productivity goals and track progress</p>
                  </div>
                  <div className="strategy-card">
                    <h4>📊 Usage Analytics</h4>
                    <p>Provide real-time analytics to users about their patterns</p>
                  </div>
                </div>
              </div>

              <div className="user-distraction-profiles">
                <h3>User Distraction Profiles</h3>
                <div className="profiles-table">
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Distraction Level</th>
                        <th>Primary Issue</th>
                        <th>Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.filter(u => u.role === 'user').map((user, idx) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>
                            <div className="distraction-level">
                              <div className="level-bar" style={{ width: `${userDistractionLevels[user.id] || 40}%` }}></div>
                            </div>
                          </td>
                          <td>{['Phone Notifications', 'Chat Messages', 'Social Media'][idx % 3]}</td>
                          <td>
                            <span className={`risk-badge ${['low', 'medium', 'high'][idx % 3]}`}>
                              {['Low', 'Medium', 'High'][idx % 3]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;