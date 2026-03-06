import React from 'react';

const ExtensionsView = ({ extensions, installExtension }) => {
  return (
    <div className="extensions-section">
      <div className="extensions-header">
        <h2>🧩 Extensions & Integrations</h2>
        <p>Enhance your productivity with powerful extensions</p>
      </div>

      <div className="extensions-grid">
        {extensions.map((ext) => (
          <div key={ext.id} className="extension-card">
            <div className="extension-icon">{ext.icon}</div>
            <h3>{ext.name}</h3>
            <p>{ext.description}</p>
            <button
              type="button"
              className={`extension-btn ${ext.installed ? 'installed' : ''}`}
              onClick={() => installExtension(ext.id)}
              disabled={ext.installed}
            >
              {ext.installed ? '✓ Installed' : '+ Install'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionsView;
