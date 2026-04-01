import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/WorkTunnel.css';
import Header from './Header';
import Footer from './Footer.jsx';
import HomeView from './HomeView.jsx';
import TodoView from './TodoView';
import ExtensionsView from './ExtensionsView';
import AIChat from './AIChat';
import AuthModal from './AuthModal.jsx';
import ExtensionPrompt from './ExtensionPrompt';

const ROTATING_ITEMS = ['manage your time', 'todo list', 'stress', 'productivity'];
const API_BASE_URL = 'http://localhost:8081';

const WorkTunnelHome = () => {
  // State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isExtensionPromptOpen, setIsExtensionPromptOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: 'John Doe',
    email: 'john@example.com',
    profession: 'Software Developer',
    joinDate: '2024-01-15',
    avatar: 'JD'
  });

  // Todo summary state for HomeView cards
  const [todos, setTodos] = useState([]);

  // Rotating text (only used in non-logged-in view)
  const [rotatingItemIndex, setRotatingItemIndex] = useState(0);

  // Extensions list (dummy)
  const extensions = [];
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname === '/todo'
    ? 'todo'
    : location.pathname === '/extensions'
      ? 'dashboard'
      : 'home';

  const setCurrentView = (view) => {
    if (view === 'todo') {
      navigate('/todo');
      return;
    }

    if (view === 'dashboard') {
      navigate('/extensions');
      return;
    }

    navigate('/');
  };

  // Effects
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingItemIndex((prev) => (prev + 1) % ROTATING_ITEMS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsExtensionPromptOpen(isLoggedIn);
  }, [isLoggedIn]);

  // Handlers
  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    setLoginError('');
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const parseApiResponse = async (response) => {
    const text = await response.text();
    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  };

  const handleLogin = async (username, password) => {
    setLoginError('');
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }
    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await parseApiResponse(response);
      if (!response.ok) throw new Error(data.message || 'Login failed');
      if (data.token) localStorage.setItem('token', data.token);
      const initials = username.split(' ').map(n => n[0]).join('').toUpperCase() || username.substring(0, 2).toUpperCase();
      const userData = {
        registerId: data.registerId || data.id || data.userId || null,
        username: data.username || username,
        email: data.email || `${username.toLowerCase()}@example.com`,
        profession: data.profession || 'User',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: initials
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      setCurrentUser(userData);
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('home');
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async ({ name, email, profession, password, age }) => {
    setLoginError('');
    if (!name || !email || !profession || !password || !age) {
      setLoginError('Please fill in all sign up fields');
      return;
    }

    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username: name,
          email,
          profession,
          password,
          age: Number(age)
        })
      });

      const data = await parseApiResponse(response);
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      // Grant immediate access after successful registration.
      const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase() || name.substring(0, 2).toUpperCase();
      const userData = {
        registerId: data.registerId || data.id || data.userId || null,
        username: data.username || name,
        email: data.email || email,
        profession: data.profession || profession,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: initials
      };

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      localStorage.setItem('userData', JSON.stringify(userData));
      setCurrentUser(userData);
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('home');
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleProfilePopup = () => setIsProfilePopupOpen(!isProfilePopupOpen);

  const openAiChat = () => setIsAiChatOpen(true);
  const closeAiChat = () => setIsAiChatOpen(false);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!chatInput.trim() || isAiLoading) return;

  const userMessage = chatInput;
  setChatMessages([...chatMessages, { type: 'user', text: userMessage }]);
  setChatInput('');
  setIsAiLoading(true);

  try {
    // Call the backend AI endpoint
    const response = await fetch('http://localhost:8081/api/ai/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promptKeywords: userMessage,
        userId: null // or set actual user ID if logged in
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Get AI response from backend
    const aiText = await response.text(); // backend currently returns String
    setChatMessages(prev => [...prev, { type: 'ai', text: aiText }]);
  } catch (error) {
    console.error('Error fetching AI response:', error);
    setChatMessages(prev => [...prev, { type: 'ai', text: 'Something went wrong. Please try again.' }]);
  } finally {
    setIsAiLoading(false);
  }
};

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const installExtension = (id) => {
    console.log(`Installing extension ${id}`);
    setCurrentView('dashboard');
  };

  // Non-logged-in content (simplified; you can keep your existing HTML)
  const renderPublicContent = () => (
    <>
      <div className="welcome">
        <h1>manage your day today life with me</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <p className="welcome-rotating-text"><strong>{ROTATING_ITEMS[rotatingItemIndex]}</strong></p>
        <button className="home-ai-btn" onClick={openAiChat}>Ask from AI</button>
      </div>
      <section id="about" className="about-section">
        <h2>About Work Tunnel</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" alt="Team collaboration" />
          </div>
          <div className="about-text">
            <h3>Why Use Work Tunnel?</h3>
            <ul className="about-benefits">
              <li><span className="benefit-icon">🎯</span><div><strong>Stay Organized</strong><p>Manage all your daily tasks, priorities, and goals in one centralized platform.</p></div></li>
              {/* ... other benefits */}
            </ul>
          </div>
        </div>
      </section>
      <section id="feedback" className="feedback-section">
        <h2>What Our Users Say</h2>
        <p className="feedback-subtitle">Join thousands of users who are managing their day-to-day life more effectively</p>
        <div className="feedback-grid">
          {/* feedback cards */}
        </div>
      </section>
    </>
  );

  return (
    <div className={`worktunnel worktunnel-${theme}`}>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        theme={theme}
        toggleTheme={toggleTheme}
        toggleProfilePopup={toggleProfilePopup}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        setCurrentView={setCurrentView}
        openAiChat={openAiChat}
        currentView={currentView}
        openLoginModal={openLoginModal}
      />

      <main className="worktunnel-main">
        {isLoggedIn ? (
          <>
            {currentView === 'home' && (
              <HomeView
                currentUser={currentUser}
                todos={todos}
                openAiChat={openAiChat}
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === 'todo' && (
              <TodoView
                currentUser={currentUser}
                onTodosChange={setTodos}
              />
            )}
            {currentView === 'dashboard' && (
              <ExtensionsView extensions={extensions} installExtension={installExtension} />
            )}
          </>
        ) : (
          renderPublicContent()
        )}
      </main>

      <Footer />

      <AIChat
        isOpen={isAiChatOpen}
        onClose={closeAiChat}
        messages={chatMessages}
        input={chatInput}
        setInput={setChatInput}
        sendMessage={sendMessage}
        isLoading={isAiLoading}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        mode={authMode}
        setMode={setAuthMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
        error={loginError}
        isLoading={isLoggingIn}
        clearError={() => setLoginError('')}
      />

      <ExtensionPrompt
        isOpen={isExtensionPromptOpen}
        onClose={() => setIsExtensionPromptOpen(false)}
        onInstall={() => {
          installExtension('worktunnel-extension');
          setCurrentView('dashboard');
          setIsExtensionPromptOpen(false);
        }}
      />
    </div>
  );
};

export default WorkTunnelHome;