import React from 'react';
import './css/ExtensionsView.css';

const ExtensionsView = ({ extensions, installExtension }) => {
  // Example extensions (replace with actual data)
  const demoExtensions = [
    { id: 1, name: 'Task Manager Pro', description: 'Advanced task management', icon: '📋' },
    { id: 2, name: 'Focus Timer', description: 'Pomodoro timer to boost focus', icon: '⏲️' },
    { id: 3, name: 'AI Insights', description: 'Get AI-powered productivity insights', icon: '🤖' },
  ];

  const extList = extensions.length > 0 ? extensions : demoExtensions;

  return (
    <div className="extensions-view">
      <h2>Extensions</h2>
      <p>Enhance your Work Tunnel experience with these add-ons.</p>
      <div className="extensions-grid">
        {extList.map(ext => (
          <div key={ext.id} className="extension-card">
            <div className="extension-icon">{ext.icon}</div>
            <h3>{ext.name}</h3>
            <p>{ext.description}</p>
            <button className="btn-secondary" onClick={() => installExtension(ext.id)}>
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionsView;