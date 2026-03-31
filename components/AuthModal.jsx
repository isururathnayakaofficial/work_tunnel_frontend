import React, { useRef } from 'react';
import './css/AuthModal.css';

const AuthModal = ({ isOpen, onClose, mode, setMode, onLogin, onSignup, error, isLoading, clearError }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const signupNameRef = useRef();
  const signupEmailRef = useRef();
  const signupProfessionRef = useRef();
  const signupPasswordRef = useRef();
  const signupAgeRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usernameRef.current.value, passwordRef.current.value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    onSignup({
      name: signupNameRef.current.value,
      email: signupEmailRef.current.value,
      profession: signupProfessionRef.current.value,
      password: signupPasswordRef.current.value,
      age: signupAgeRef.current.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        {mode === 'login' ? (
          <>
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                ref={usernameRef}
                required
                onChange={clearError}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
                onChange={clearError}
              />
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="auth-actions">
              <a href="#">Forgot password?</a>
              <button type="button" className="link-btn" onClick={() => setMode('signup')}>
                Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSignupSubmit}>
              <label htmlFor="signup-name">Name</label>
              <input id="signup-name" type="text" placeholder="Enter name" ref={signupNameRef} required onChange={clearError} />
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" type="email" placeholder="Enter email" ref={signupEmailRef} required onChange={clearError} />
              <label htmlFor="signup-profession">Profession</label>
              <input id="signup-profession" type="text" placeholder="Enter profession" ref={signupProfessionRef} required onChange={clearError} />
              <label htmlFor="signup-password">Password</label>
              <input id="signup-password" type="password" placeholder="Enter password" ref={signupPasswordRef} required onChange={clearError} />
              <label htmlFor="signup-age">Age</label>
              <input id="signup-age" type="number" placeholder="Enter age" min="1" ref={signupAgeRef} required onChange={clearError} />
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            <div className="auth-actions">
              <button type="button" className="link-btn" onClick={() => setMode('login')}>
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;