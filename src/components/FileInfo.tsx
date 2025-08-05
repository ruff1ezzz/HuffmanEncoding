import React from 'react';
import { FileData } from '../App';
import './FileInfo.css';

interface FileInfoProps {
  file: FileData;
  onRemove: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({ file, onRemove }) => {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      'txt': 'fas fa-file-alt',
      'pdf': 'fas fa-file-pdf',
      'doc': 'fas fa-file-word',
      'docx': 'fas fa-file-word',
      'xls': 'fas fa-file-excel',
      'xlsx': 'fas fa-file-excel',
      'jpg': 'fas fa-file-image',
      'jpeg': 'fas fa-file-image',
      'png': 'fas fa-file-image',
      'gif': 'fas fa-file-image',
      'mp3': 'fas fa-file-audio',
      'mp4': 'fas fa-file-video',
      'zip': 'fas fa-file-archive',
      'rar': 'fas fa-file-archive',
      'huf': 'fas fa-compress-alt'
    };
    return iconMap[ext || ''] || 'fas fa-file';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-info">
      <div className="file-details">
        <i className={getFileIcon(file.name)}></i>
        <div className="file-text">
          <h4>{file.name}</h4>
          <p>{formatFileSize(file.size)}</p>
        </div>
        <button className="remove-btn" onClick={onRemove} type="button">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default FileInfo; 