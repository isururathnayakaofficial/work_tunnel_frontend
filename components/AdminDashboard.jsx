import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';

const BASE_URL = "http://localhost:8081/"; // replace with your backend URL

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Replace mock authentication with actual backend request
  const authenticateUser = async (user, pass) => {
    const response = await fetch(`${BASE_URL}api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user, password: pass }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    return data; // backend can return token or admin info
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await authenticateUser(username, password);

      // Optional: Save token or user info in localStorage
      if (result.token) {
        localStorage.setItem('adminToken', result.token);
      }

      // Navigate to dashboard
      navigate('/adminNavbar');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotClick = () => {
    alert('Please check your email for recovery instructions.');
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Panel Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              className={error && !username.trim() ? 'input-error' : ''}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={error && !password.trim() ? 'input-error' : ''}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div
            className="forgot-section"
            onClick={handleForgotClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleForgotClick();
            }}
          >
            Forgot password or username? Watch your email inbox.
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;