/**
 * Main Layout component
 */
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <div className="layout-container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

