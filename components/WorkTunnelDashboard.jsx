// import React, { useState, useEffect, useRef } from 'react';
// import './css/WorkTunnel.css';
// import HomeView from './HomeView';
// import TodoView from './TodoView';
// import ExtensionsView from './ExtensionsView';
// import { clearSession } from './js/authService';

// const WorkTunnelHome = () => {
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authMode, setAuthMode] = useState('login');
//   const [isAiChatOpen, setIsAiChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatInput, setChatInput] = useState('');
//   const [isAiLoading, setIsAiLoading] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
//   const [isExtensionPromptOpen, setIsExtensionPromptOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentView, setCurrentView] = useState('home');
//   const [theme, setTheme] = useState('light');
//   const [loginError, setLoginError] = useState('');
//   const [isLoggingIn, setIsLoggingIn] = useState(false); // new loading state
//   const [currentUser, setCurrentUser] = useState({
//     username: 'John Doe',
//     email: 'john@example.com',
//     profession: 'Software Developer',
//     joinDate: '2024-01-15',
//     avatar: 'JD'
//   });

//   const rotatingItems = ['manage your time', 'todo list', 'stress', 'productivity'];
//   const [rotatingItemIndex, setRotatingItemIndex] = useState(0);

//   // Todo state
//   const [todos, setTodos] = useState([]);
//   const [newTodoTitle, setNewTodoTitle] = useState('');
//   const [newTodoPriority, setNewTodoPriority] = useState('medium');
//   const [newTodoDate, setNewTodoDate] = useState('');
//   const [newTodoTime, setNewTodoTime] = useState('');
//   const [newTodoEndTime, setNewTodoEndTime] = useState('');

//   // Refs for login form inputs (optional, but cleaner)
//   const usernameInputRef = useRef(null);
//   const passwordInputRef = useRef(null);

//   const extensions = [];

//   // Check saved session on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('userData');
//     if (token && savedUser) {
//       try {
//         const userData = JSON.parse(savedUser);
//         setCurrentUser(userData);
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('userData');
//       }
//     }

//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   // Rotating text effect
//   useEffect(() => {
//     const rotateInterval = setInterval(() => {
//       setRotatingItemIndex((prev) => (prev + 1) % rotatingItems.length);
//     }, 1800);
//     return () => clearInterval(rotateInterval);
//   }, [rotatingItems.length]);

//   // Show extension prompt after login
//   useEffect(() => {
//     setIsExtensionPromptOpen(isLoggedIn);
//   }, [isLoggedIn]);

//   // Lock body scroll on mobile menu
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const openLoginModal = () => {
//     setAuthMode('login');
//     setIsAuthModalOpen(true);
//     setLoginError('');
//     // Reset inputs and error
//     if (usernameInputRef.current) usernameInputRef.current.value = '';
//     if (passwordInputRef.current) passwordInputRef.current.value = '';
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//     setLoginError('');
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError('');

//     const username = usernameInputRef.current?.value || document.getElementById('username')?.value;
//     const password = passwordInputRef.current?.value || document.getElementById('password')?.value;

//     if (!username || !password) {
//       setLoginError('Please enter both username and password');
//       return;
//     }

//     setIsLoggingIn(true);

//     try {
//       const response = await fetch('http://localhost:8081/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Use error message from backend or generic one
//         throw new Error(data.message || 'Login failed. Please check your credentials.');
//       }

//       // Success: store token and user data
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }

//       // Build user object
//       const initials = username.split(' ').map(n => n[0]).join('').toUpperCase() || username.substring(0, 2).toUpperCase();
//       const userData = {
//         username: data.username || username,
//         email: data.email || `${username.toLowerCase()}@example.com`,
//         profession: data.profession || 'User',
//         joinDate: new Date().toISOString().split('T')[0],
//         avatar: initials
//       };

//       localStorage.setItem('userData', JSON.stringify(userData));
//       setCurrentUser(userData);
//       setIsLoggedIn(true);
//       setIsAuthModalOpen(false);
//       setCurrentView('home');
//       setLoginError('');

//     } catch (error) {
//       console.error('Login error:', error);
//       setLoginError(error.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoggingIn(false);
//     }
//   };

//   const handleLogout = () => {
//     clearSession();
//     setIsLoggedIn(false);
//     setCurrentView('home');
//     setIsProfilePopupOpen(false);
//     setCurrentUser({
//       username: 'John Doe',
//       email: 'john@example.com',
//       profession: 'Software Developer',
//       joinDate: '2024-01-15',
//       avatar: 'JD'
//     });
//   };

//   const toggleProfilePopup = () => {
//     setIsProfilePopupOpen(!isProfilePopupOpen);
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const addTodo = (e) => {
//     e.preventDefault();

//     if (!newTodoTitle.trim()) {
//       alert('Please enter a task title');
//       return;
//     }
//     if (!newTodoPriority) {
//       alert('Please select a priority level');
//       return;
//     }
//     if (!newTodoDate) {
//       alert('Please select a date');
//       return;
//     }
//     if (!newTodoTime) {
//       alert('Please select a start time');
//       return;
//     }

//     const newTodo = {
//       id: Date.now(),
//       title: newTodoTitle,
//       completed: false,
//       priority: newTodoPriority,
//       date: newTodoDate,
//       time: newTodoTime,
//       endTime: newTodoEndTime
//     };

//     setTodos([...todos, newTodo]);
//     setNewTodoTitle('');
//     setNewTodoPriority('medium');
//     setNewTodoDate('');
//     setNewTodoTime('');
//     setNewTodoEndTime('');
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const installExtension = (id) => {
//     console.log(`Installing extension ${id}`);
//   };

//   const openAiChat = () => {
//     setIsAiChatOpen(true);
//   };

//   const closeAiChat = () => {
//     setIsAiChatOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (chatInput.trim() && !isAiLoading) {
//       const userMessage = chatInput;
//       setChatMessages([...chatMessages, { type: 'user', text: userMessage }]);
//       setChatInput('');
//       setIsAiLoading(true);

//       try {
//         // Placeholder AI response – replace with actual API call
//         const response = { reply: 'I\'m here to help you manage your tasks and boost productivity. What would you like assistance with?' };
//         setChatMessages((prev) => [...prev, { type: 'ai', text: response.reply }]);
//       } catch {
//         setChatMessages((prev) => [
//           ...prev,
//           { type: 'ai', text: 'Something went wrong while sending your request. Please try again.' },
//         ]);
//       } finally {
//         setIsAiLoading(false);
//       }
//     }
//   };

//   // Clear login error when user starts typing again
//   const handleInputChange = () => {
//     if (loginError) setLoginError('');
//   };

//   return (
//     <div className={`worktunnel worktunnel-${theme}`}>
//       <header className="worktunnel-header">
//         <div className="worktunnel-logo">Work Tunnel</div>

//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
//           <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </span>
//         </button>

//         {isMobileMenuOpen && (
//           <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
//         )}

//         <nav className={`worktunnel-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
//           {isLoggedIn ? (
//             <>
//               <button type="button" className="nav-link" onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}>Home</button>
//               <button type="button" className="nav-link" onClick={() => { setCurrentView('todo'); setIsMobileMenuOpen(false); }}>📝 Todo List</button>
//               <button type="button" className="nav-link" onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}>Extensions</button>
//               <button type="button" className="nav-link" onClick={() => { openAiChat(); setIsMobileMenuOpen(false); }}>🤖 AI Chat</button>
//             </>
//           ) : (
//             <>
//               <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
//               <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
//               <a href="#feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedbacks</a>
//               <a href="#" onClick={() => { openAiChat(); setIsMobileMenuOpen(false); }}>AI Assistant</a>
//             </>
//           )}
//         </nav>

//         {isLoggedIn && (
//           <div className="user-profile-section">
//             <button type="button" className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
//               {theme === 'light' ? '🌙' : '☀️'}
//             </button>
//             <button type="button" className="profile-trigger" onClick={toggleProfilePopup} title="Profile">
//               <span className="profile-avatar">{currentUser.avatar}</span>
//               <span className="profile-username">{currentUser.username.split(' ')[0]}</span>
//             </button>

//             {isProfilePopupOpen && (
//               <div className="profile-popup-overlay" onClick={() => setIsProfilePopupOpen(false)}>
//                 <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
//                   <div className="profile-header">
//                     <div className="profile-avatar-large">{currentUser.avatar}</div>
//                     <h3>{currentUser.username}</h3>
//                     <p className="profile-meta">{currentUser.profession}</p>
//                   </div>

//                   <div className="profile-details">
//                     <div className="detail-item">
//                       <span className="detail-label">Email:</span>
//                       <span className="detail-value">{currentUser.email}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Member Since:</span>
//                       <span className="detail-value">{currentUser.joinDate}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Profile Status:</span>
//                       <span className="detail-value status-badge">Active</span>
//                     </div>
//                   </div>

//                   <div className="profile-actions">
//                     <button type="button" className="profile-btn edit-btn">✏️ Edit Profile</button>
//                     <button type="button" className="profile-btn settings-btn">⚙️ Settings</button>
//                     <button type="button" className="profile-btn logout-btn" onClick={handleLogout}>🚪 Logout</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {!isLoggedIn && (
//           <button type="button" className="login-btn" onClick={openLoginModal}>Login</button>
//         )}
//       </header>

//       <main className="worktunnel-main">
//         {isLoggedIn ? (
//           <>
//             {currentView === 'home' && (
//               <HomeView
//                 currentUser={currentUser}
//                 todos={todos}
//                 openAiChat={openAiChat}
//                 setCurrentView={setCurrentView}
//               />
//             )}
//             {currentView === 'todo' && (
//               <TodoView
//                 todos={todos}
//                 newTodoTitle={newTodoTitle}
//                 setNewTodoTitle={setNewTodoTitle}
//                 newTodoPriority={newTodoPriority}
//                 setNewTodoPriority={setNewTodoPriority}
//                 newTodoDate={newTodoDate}
//                 setNewTodoDate={setNewTodoDate}
//                 newTodoTime={newTodoTime}
//                 setNewTodoTime={setNewTodoTime}
//                 newTodoEndTime={newTodoEndTime}
//                 setNewTodoEndTime={setNewTodoEndTime}
//                 addTodo={addTodo}
//                 toggleTodo={toggleTodo}
//                 deleteTodo={deleteTodo}
//               />
//             )}
//             {currentView === 'dashboard' && (
//               <ExtensionsView
//                 extensions={extensions}
//                 installExtension={installExtension}
//               />
//             )}
//           </>
//         ) : (
//           <>
//             <div className="welcome">
//               <h1>manage your day today life with me</h1>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus
//                 posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus
//                 porttitor.
//               </p>
//               <p className="welcome-rotating-text">
//                 <strong>{rotatingItems[rotatingItemIndex]}</strong>
//               </p>
//               <button type="button" className="home-ai-btn" onClick={openAiChat}>Ask from AI</button>
//             </div>

//             <section id="about" className="about-section">
//               <h2>About Work Tunnel</h2>
//               <div className="about-content">
//                 <div className="about-image">
//                   <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" alt="Team collaboration" />
//                 </div>
//                 <div className="about-text">
//                   <h3>Why Use Work Tunnel?</h3>
//                   <ul className="about-benefits">
//                     <li><span className="benefit-icon">🎯</span><div><strong>Stay Organized</strong><p>Manage all your daily tasks, priorities, and goals in one centralized platform.</p></div></li>
//                     <li><span className="benefit-icon">🤖</span><div><strong>AI-Powered Assistant</strong><p>Get intelligent suggestions for task prioritization, time management, and productivity tips.</p></div></li>
//                     <li><span className="benefit-icon">⚡</span><div><strong>Boost Productivity</strong><p>Proven techniques and frameworks to help you accomplish more in less time.</p></div></li>
//                     <li><span className="benefit-icon">📊</span><div><strong>Track Progress</strong><p>Visualize your accomplishments and stay motivated with clear progress tracking.</p></div></li>
//                     <li><span className="benefit-icon">🧘</span><div><strong>Work-Life Balance</strong><p>Tools and insights to help you maintain healthy boundaries and avoid burnout.</p></div></li>
//                     <li><span className="benefit-icon">🔄</span><div><strong>Build Better Habits</strong><p>Create lasting routines with science-backed habit formation strategies.</p></div></li>
//                   </ul>
//                 </div>
//               </div>
//             </section>

//             <section id="feedback" className="feedback-section">
//               <h2>What Our Users Say</h2>
//               <p className="feedback-subtitle">Join thousands of users who are managing their day-to-day life more effectively</p>
//               <div className="feedback-grid">
//                 <div className="feedback-card">
//                   <div className="feedback-rating">⭐⭐⭐⭐⭐</div>
//                   <p className="feedback-text">"Work Tunnel has completely transformed how I manage my daily tasks. The AI assistant is incredibly helpful and the interface is intuitive. I'm more productive than ever!"</p>
//                   <div className="feedback-author"><div className="author-avatar">SJ</div><div className="author-info"><strong>Sarah Johnson</strong><span>Marketing Manager</span></div></div>
//                 </div>
//                 {/* other feedback cards */}
//               </div>
//             </section>
//           </>
//         )}
//       </main>

//       {/* AI Chat Modal */}
//       {isAiChatOpen && (
//         <div className="ai-chat-overlay" onClick={closeAiChat}>
//           <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="ai-chat-header">
//               <h3>AI Assistant</h3>
//               <button type="button" className="ai-chat-close" onClick={closeAiChat}>×</button>
//             </div>
//             <div className="ai-chat-messages">
//               {chatMessages.length === 0 ? (
//                 <div className="ai-chat-welcome">
//                   <p>👋 Hello! I'm your AI assistant.</p>
//                   <p>How can I help you manage your day today?</p>
//                 </div>
//               ) : (
//                 chatMessages.map((msg, index) => (
//                   <div key={index} className={`ai-chat-message ${msg.type}`}>
//                     <div className="message-bubble">{msg.text}</div>
//                   </div>
//                 ))
//               )}
//               {isAiLoading && (
//                 <div className="ai-chat-message ai">
//                   <div className="message-bubble">
//                     <div className="typing-indicator"><span></span><span></span><span></span></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <form className="ai-chat-input-form" onSubmit={sendMessage}>
//               <input type="text" placeholder="Type your message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} disabled={isAiLoading} />
//               <button type="submit" disabled={isAiLoading}>{isAiLoading ? 'Sending...' : 'Send'}</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Login / Signup Modal */}
//       {isAuthModalOpen && (
//         <div className="auth-modal-overlay" onClick={closeAuthModal}>
//           <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
//             <button type="button" className="auth-close" onClick={closeAuthModal}>×</button>
//             {authMode === 'login' ? (
//               <>
//                 <h2>Login</h2>
//                 {loginError && <div className="auth-error">{loginError}</div>}
//                 <form className="auth-form" onSubmit={handleLogin}>
//                   <label htmlFor="username">Username</label>
//                   <input
//                     id="username"
//                     type="text"
//                     placeholder="Enter username"
//                     required
//                     ref={usernameInputRef}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="password">Password</label>
//                   <input
//                     id="password"
//                     type="password"
//                     placeholder="Enter password"
//                     required
//                     ref={passwordInputRef}
//                     onChange={handleInputChange}
//                   />
//                   <button type="submit" className="auth-submit" disabled={isLoggingIn}>
//                     {isLoggingIn ? 'Logging in...' : 'Login'}
//                   </button>
//                 </form>
//                 <div className="auth-actions">
//                   <a href="#">Forgot password?</a>
//                   <button type="button" className="auth-link-btn" onClick={() => setAuthMode('signup')}>Sign up</button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2>Sign Up</h2>
//                 <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
//                   <label htmlFor="signup-name">Name</label>
//                   <input id="signup-name" type="text" placeholder="Enter name" required />
//                   <label htmlFor="signup-email">Email</label>
//                   <input id="signup-email" type="email" placeholder="Enter email" required />
//                   <label htmlFor="signup-profession">Profession</label>
//                   <input id="signup-profession" type="text" placeholder="Enter profession" required />
//                   <label htmlFor="signup-password">Password</label>
//                   <input id="signup-password" type="password" placeholder="Enter password" required />
//                   <label htmlFor="signup-age">Age</label>
//                   <input id="signup-age" type="number" placeholder="Enter age" min="1" required />
//                   <button type="submit" className="auth-submit">Create account</button>
//                 </form>
//                 <div className="auth-actions">
//                   <button type="button" className="auth-link-btn" onClick={() => setAuthMode('login')}>Back to login</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Extension Install Prompt */}
//       {isLoggedIn && isExtensionPromptOpen && (
//         <div className="extension-install-overlay" onClick={() => setIsExtensionPromptOpen(false)}>
//           <div className="extension-install-modal" onClick={(e) => e.stopPropagation()}>
//             <h3>Install Work Tunnel Extension</h3>
//             <p>Boost your workflow with the Work Tunnel extension. Install it now for quicker access, smart suggestions, and faster task management.</p>
//             <div className="extension-install-actions">
//               <button type="button" className="install-now-btn" onClick={() => { installExtension('worktunnel-extension'); setCurrentView('dashboard'); setIsExtensionPromptOpen(false); }}>Install Now</button>
//               <button type="button" className="install-later-btn" onClick={() => setIsExtensionPromptOpen(false)}>Later</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <footer className="worktunnel-footer">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3 className="footer-brand">Work Tunnel</h3>
//             <p className="footer-tagline">Manage your day-to-day life with intelligent AI assistance. Stay organized, productive, and focused on what matters most.</p>
//             <div className="footer-social">
//               {/* social icons */}
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Product</h4>
//             <ul><li><a href="#features">Features</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#about">About Us</a></li><li><a href="#feedback">Testimonials</a></li><li><a href="#roadmap">Roadmap</a></li></ul>
//           </div>
//           <div className="footer-section">
//             <h4>Resources</h4>
//             <ul><li><a href="#blog">Blog</a></li><li><a href="#help">Help Center</a></li><li><a href="#tutorials">Tutorials</a></li><li><a href="#api">API Docs</a></li><li><a href="#community">Community</a></li></ul>
//           </div>
//           <div className="footer-section">
//             <h4>Company</h4>
//             <ul><li><a href="#about">About</a></li><li><a href="#careers">Careers</a></li><li><a href="#contact">Contact</a></li><li><a href="#press">Press Kit</a></li><li><a href="#partners">Partners</a></li></ul>
//           </div>
//           <div className="footer-section">
//             <h4>Stay Updated</h4>
//             <p className="footer-newsletter-text">Get productivity tips and updates delivered to your inbox.</p>
//             <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
//               <input type="email" placeholder="Enter your email" required />
//               <button type="submit">Subscribe</button>
//             </form>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <div className="footer-legal">
//             <p>© 2025 Work Tunnel. All rights reserved.</p>
//             <div className="footer-legal-links"><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a><a href="#cookies">Cookie Policy</a></div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default WorkTunnelHome;