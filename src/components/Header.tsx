import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>
        <i className="fas fa-compress-alt"></i> Huffman Encoding
      </h1>
      <p>Efficient file compression using Huffman coding algorithm</p>
    </header>
  );
};

export default Header; 