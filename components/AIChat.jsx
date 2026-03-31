import React from 'react';
import './css/AIChat.css';

const AIChat = ({ isOpen, onClose, messages, input, setInput, sendMessage, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-chat-header">
          <h3>AI Assistant</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="ai-chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <p>👋 Hello! I'm your AI assistant.</p>
              <p>How can I help you manage your day today?</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="bubble">{msg.text}</div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message ai">
              <div className="bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>
        <form className="input-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;