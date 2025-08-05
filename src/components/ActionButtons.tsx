import React from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
  onCompress: () => void;
  onDecompress: () => void;
  isCompressedFile: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onCompress, 
  onDecompress, 
  isCompressedFile 
}) => {
  return (
    <div className="action-buttons">
      <button 
        className="compress-btn" 
        onClick={onCompress} 
        type="button"
        disabled={isCompressedFile}
        title={isCompressedFile ? "This file is already compressed" : "Compress this file"}
      >
        <i className="fas fa-compress-alt"></i> 
        {isCompressedFile ? 'File Already Compressed' : 'Compress File'}
      </button>
      <button 
        className="decompress-btn" 
        onClick={onDecompress} 
        type="button"
        disabled={!isCompressedFile}
        title={!isCompressedFile ? "Select a compressed file (.huf) to decompress" : "Decompress this file"}
      >
        <i className="fas fa-expand-alt"></i> 
        {!isCompressedFile ? 'Select Compressed File' : 'Decompress File'}
      </button>
    </div>
  );
};

export default ActionButtons; 