/**
 * Header component
 */
import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Housing Price Predictor</h1>
        <p className="header-subtitle">
          Predict house prices using machine learning
        </p>
      </div>
    </header>
  );
};

