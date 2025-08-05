import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Built using React, TypeScript, and C++.</p>
      <div className="footer-links">
        <a href="https://github.com/ruff1ezzz/HuffmanEncoding" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> View on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer; 