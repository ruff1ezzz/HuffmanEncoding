import React from 'react';
import './InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <section className="info-section">
      <h2>
        <i className="fas fa-info-circle"></i> About Huffman Encoding
      </h2>
      <div className="info-grid">
        <div className="info-card">
          <h3>
            <i className="fas fa-cog"></i> How It Works
          </h3>
          <p>Huffman coding creates variable-length codes for characters based on their frequency. Frequently occurring characters get shorter codes, resulting in efficient compression.</p>
        </div>
        <div className="info-card">
          <h3>
            <i className="fas fa-shield-alt"></i> Lossless Compression
          </h3>
          <p>All original data is preserved during compression and decompression. No information is lost in the process.</p>
        </div>
        <div className="info-card">
          <h3>
            <i className="fas fa-chart-bar"></i> Best Performance
          </h3>
          <p>Works best with files containing repetitive patterns or skewed character distributions, like text files or DNA sequences.</p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 