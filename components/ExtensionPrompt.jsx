import React from 'react';
import './css/ExtensionPrompt.css';

const ExtensionPrompt = ({ isOpen, onClose, onInstall }) => {
  if (!isOpen) return null;

  return (
    <div className="extension-prompt-overlay" onClick={onClose}>
      <div className="extension-prompt-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Install Work Tunnel Extension</h3>
        <p>
          Boost your workflow with the Work Tunnel extension. Install it now for quicker access,
          smart suggestions, and faster task management.
        </p>
        <div className="prompt-actions">
          <button className="btn-primary" onClick={onInstall}>Install Now</button>
          <button className="btn-secondary" onClick={onClose}>Later</button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPrompt;