import React, { useState, useEffect } from 'react';
import './css/WorkTunnel.css';
import { generateAIResponse } from './aiResponseGenerator'; 

const WorkTunnelHome = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openAiChat = () => {
    setIsAiChatOpen(true);
  };

  const closeAiChat = () => {
    setIsAiChatOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (chatInput.trim() && !isAiLoading) {
      const userMessage = chatInput;
      setChatMessages([...chatMessages, { type: 'user', text: userMessage }]);
      setChatInput('');
      setIsAiLoading(true);
      
      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse = generateAIResponse(userMessage);
        setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
        setIsAiLoading(false);
      }, 800);
    }
  };

  return (
    <div className="worktunnel">
      <header className="worktunnel-header">
        <div className="worktunnel-logo">Work Tunnel</div>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {isMobileMenuOpen && (
          <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        <nav className={`worktunnel-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedbacks</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>AI Assistant</a>
          <button type="button" className="login-btn" onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}>Login</button>
        </nav>
      </header>

      <main className="worktunnel-main">
        <div className="welcome">
          <h1>manage your day today life with me</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus
            posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus
            porttitor.
          </p>
          <button type="button" className="home-ai-btn" onClick={openAiChat}>Ask from AI</button>
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
                <li>
                  <span className="benefit-icon">🎯</span>
                  <div>
                    <strong>Stay Organized</strong>
                    <p>Manage all your daily tasks, priorities, and goals in one centralized platform.</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">🤖</span>
                  <div>
                    <strong>AI-Powered Assistant</strong>
                    <p>Get intelligent suggestions for task prioritization, time management, and productivity tips.</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">⚡</span>
                  <div>
                    <strong>Boost Productivity</strong>
                    <p>Proven techniques and frameworks to help you accomplish more in less time.</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">📊</span>
                  <div>
                    <strong>Track Progress</strong>
                    <p>Visualize your accomplishments and stay motivated with clear progress tracking.</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">🧘</span>
                  <div>
                    <strong>Work-Life Balance</strong>
                    <p>Tools and insights to help you maintain healthy boundaries and avoid burnout.</p>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon">🔄</span>
                  <div>
                    <strong>Build Better Habits</strong>
                    <p>Create lasting routines with science-backed habit formation strategies.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="feedback" className="feedback-section">
          <h2>What Our Users Say</h2>
          <p className="feedback-subtitle">Join thousands of users who are managing their day-to-day life more effectively</p>
          
          <div className="feedback-grid">
            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "Work Tunnel has completely transformed how I manage my daily tasks. The AI assistant is incredibly helpful and the interface is intuitive. I'm more productive than ever!"
              </p>
              <div className="feedback-author">
                <div className="author-avatar">SJ</div>
                <div className="author-info">
                  <strong>Sarah Johnson</strong>
                  <span>Marketing Manager</span>
                </div>
              </div>
            </div>

            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "As a freelancer juggling multiple projects, this tool is a lifesaver. The prioritization features and AI recommendations help me stay on track and meet all my deadlines."
              </p>
              <div className="feedback-author">
                <div className="author-avatar">MC</div>
                <div className="author-info">
                  <strong>Michael Chen</strong>
                  <span>Freelance Designer</span>
                </div>
              </div>
            </div>

            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "I love how Work Tunnel helps me balance work and personal life. The habit tracking and goal setting features keep me motivated and focused on what matters most."
              </p>
              <div className="feedback-author">
                <div className="author-avatar">EP</div>
                <div className="author-info">
                  <strong>Emily Parker</strong>
                  <span>Software Developer</span>
                </div>
              </div>
            </div>

            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "The AI assistant is like having a personal productivity coach. It understands my work patterns and gives me actionable advice that actually works. Highly recommended!"
              </p>
              <div className="feedback-author">
                <div className="author-avatar">DT</div>
                <div className="author-info">
                  <strong>David Thompson</strong>
                  <span>Entrepreneur</span>
                </div>
              </div>
            </div>

            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "Finally, a productivity tool that doesn't feel overwhelming. Work Tunnel is simple, elegant, and actually helps me get things done without adding stress."
              </p>
              <div className="feedback-author">
                <div className="author-avatar">LA</div>
                <div className="author-info">
                  <strong>Lisa Anderson</strong>
                  <span>Project Manager</span>
                </div>
              </div>
            </div>

            <div className="feedback-card">
              <div className="feedback-rating">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <p className="feedback-text">
                "The time management features are game-changing. I've cut my work hours by 20% while actually accomplishing more. This tool pays for itself!"
              </p>
              <div className="feedback-author">
                <div className="author-avatar">JR</div>
                <div className="author-info">
                  <strong>James Rodriguez</strong>
                  <span>Sales Director</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isAiChatOpen && (
        <div className="ai-chat-overlay" onClick={closeAiChat}>
          <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-chat-header">
              <h3>AI Assistant</h3>
              <button type="button" className="ai-chat-close" onClick={closeAiChat}>×</button>
            </div>
            
            <div className="ai-chat-messages">
              {chatMessages.length === 0 ? (
                <div className="ai-chat-welcome">
                  <p>👋 Hello! I'm your AI assistant.</p>
                  <p>How can I help you manage your day today?</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div key={index} className={`ai-chat-message ${msg.type}`}>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ))
              )}
              {isAiLoading && (
                <div className="ai-chat-message ai">
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form className="ai-chat-input-form" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isAiLoading}
              />
              <button type="submit" disabled={isAiLoading}>
                {isAiLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <div className="auth-modal-overlay" onClick={closeAuthModal}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="auth-close" onClick={closeAuthModal}>×</button>

            {authMode === 'login' ? (
              <>
                <h2>Login</h2>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" placeholder="Enter username" required />

                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="Enter password" required />

                  <button type="submit" className="auth-submit">Login</button>
                </form>

                <div className="auth-actions">
                  <a href="#">Forgot password?</a>
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign up
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="signup-name">Name</label>
                  <input id="signup-name" type="text" placeholder="Enter name" required />

                  <label htmlFor="signup-email">Email</label>
                  <input id="signup-email" type="email" placeholder="Enter email" required />

                  <label htmlFor="signup-profession">Profession</label>
                  <input id="signup-profession" type="text" placeholder="Enter profession" required />

                  <label htmlFor="signup-age">Age</label>
                  <input id="signup-age" type="number" placeholder="Enter age" min="1" required />

                  <button type="submit" className="auth-submit">Create account</button>
                </form>

                <div className="auth-actions">
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => setAuthMode('login')}
                  >
                    Back to login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="worktunnel-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">Work Tunnel</h3>
            <p className="footer-tagline">
              Manage your day-to-day life with intelligent AI assistance. 
              Stay organized, productive, and focused on what matters most.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" aria-label="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#feedback">Testimonials</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
              <li><a href="#api">API Docs</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#press">Press Kit</a></li>
              <li><a href="#partners">Partners</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p className="footer-newsletter-text">Get productivity tips and updates delivered to your inbox.</p>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© 2025 Work Tunnel. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkTunnelHome;