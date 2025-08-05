import React, { useCallback, useRef, useState } from 'react';
import './UploadSection.css';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="upload-section">
      <div 
        className={`upload-area ${isDragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <h3>Upload File to Compress</h3>
        <p>Drag and drop your file here or click to browse</p>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="*/*" 
          style={{ display: 'none' }}
        />
        <button className="browse-btn" type="button">
          Choose File
        </button>
      </div>
    </div>
  );
};

export default UploadSection; 