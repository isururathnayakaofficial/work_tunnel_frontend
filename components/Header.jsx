import React from 'react';
import './css/Header.css';

const Header = ({
  isLoggedIn,
  currentUser,
  theme,
  toggleTheme,
  toggleProfilePopup,
  isMobileMenuOpen,
  toggleMobileMenu,
  setCurrentView,
  openAiChat,
  currentView,
  openLoginModal
}) => {
  const navLinks = isLoggedIn ? [
    { label: 'Home', view: 'home', onClick: () => setCurrentView('home') },
    { label: '📝 Todo List', view: 'todo', onClick: () => setCurrentView('todo') },
    { label: 'Extensions', view: 'dashboard', onClick: () => setCurrentView('dashboard') },
      { label: 'Feature', view: 'DoctorPatientPortal', href: '/feature', onClick: () => setCurrentView('DoctorPatientPortal') },
    { label: '🤖 AI Chat', view: 'chat', onClick: openAiChat }
    
  ] : [
    { label: 'Home', href: '/#' },
    { label: 'About', href: '/#about' },
    { label: 'Feedbacks', href: '/#feedback' },
    { label: 'AI Assistant', onClick: openAiChat }
  ];

  return (
    <header className="worktunnel-header">
      <div className="header-container">
        <div className="worktunnel-logo">Work Tunnel  </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`worktunnel-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link, idx) => (
            link.href ? (
              <a key={idx} href={link.href} onClick={() => toggleMobileMenu()}>
                {link.label}
              </a>
            ) : (
              <button
                key={idx}
                type="button"
                className={`nav-link ${currentView === link.view ? 'active' : ''}`}
                onClick={() => {
                  link.onClick();
                  toggleMobileMenu();
                }}
              >
                {link.label}
              </button>
            )
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            
          </button>

          {isLoggedIn ? (
            <div className="user-profile-section">
              <button className="profile-trigger" onClick={toggleProfilePopup} title="Profile">
                <span className="profile-avatar">{currentUser.avatar}</span>
                <span className="profile-username">{currentUser.username.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={openLoginModal}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;