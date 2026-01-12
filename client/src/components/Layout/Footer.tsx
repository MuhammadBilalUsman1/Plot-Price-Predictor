/**
 * Footer component
 */
import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          Powered by XGBoost Machine Learning Model
        </p>
        <p className="footer-text footer-text--muted">
          Built with React, TypeScript, and Node.js
        </p>
      </div>
    </footer>
  );
};

