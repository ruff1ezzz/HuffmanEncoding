import React from 'react';
import { CompressionResult, ProcessedFile } from '../App';
import './Results.css';

interface ResultsProps {
  results?: CompressionResult;
  processedFile: ProcessedFile;
  isCompressed: boolean;
  onDownload: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, processedFile, isCompressed, onDownload }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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

  return (
    <div className="results">
      <div className="result-card">
        <h3>
          <i className="fas fa-chart-line"></i> 
          {isCompressed ? 'Compression Results' : 'Decompression Results'}
        </h3>
        
        {results && (
          <div className="result-stats">
            <div className="stat">
              <span className="label">Original Size:</span>
              <span className="value">{formatFileSize(results.originalSize)}</span>
            </div>
            <div className="stat">
              <span className="label">
                {isCompressed ? 'Compressed Size:' : 'Decompressed Size:'}
              </span>
              <span className="value">{formatFileSize(results.compressedSize)}</span>
            </div>
            <div className="stat">
              <span className="label">
                {isCompressed ? 'Compression Ratio:' : 'Restoration Ratio:'}
              </span>
              <span className="value">{results.compressionRatio.toFixed(1)}%</span>
            </div>
            <div className="stat">
              <span className="label">
                {isCompressed ? 'Space Saved:' : 'File Restored:'}
              </span>
              <span className="value">{formatFileSize(results.spaceSaved)}</span>
            </div>
          </div>
        )}

        <div className="processed-file-info">
          <h4>
            <i className="fas fa-file"></i> 
            {isCompressed ? 'Compressed File:' : 'Decompressed File:'}
          </h4>
          <div className="file-details">
            <i className={getFileIcon(processedFile.name)}></i>
            <div className="file-text">
              <h5>{processedFile.name}</h5>
              <p>{formatFileSize(processedFile.size)}</p>
            </div>
          </div>
        </div>

        <button className="download-btn" onClick={onDownload} type="button">
          <i className="fas fa-download"></i> 
          Download {isCompressed ? 'Compressed' : 'Decompressed'} File
        </button>
      </div>
    </div>
  );
};

export default Results; 