import React from 'react';
import { ProcessingStep } from '../App';
import './ProgressSection.css';

interface ProgressSectionProps {
  currentStep: ProcessingStep;
  progress: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ currentStep, progress }) => {
  const getStepText = (step: ProcessingStep): string => {
    const stepTexts: Record<ProcessingStep, string> = {
      'idle': 'Ready',
      'analyzing': 'Analyzing file...',
      'building_frequency': 'Building frequency table...',
      'constructing_tree': 'Constructing Huffman tree...',
      'encoding': 'Encoding data...',
      'writing': 'Writing compressed file...',
      'complete': 'Compression complete!',
      'decompressing': 'Reading compressed file...',
      'reconstructing_tree': 'Reconstructing Huffman tree...',
      'decoding': 'Decoding data...',
      'writing_decompressed': 'Writing decompressed file...'
    };
    return stepTexts[step];
  };

  return (
    <div className="progress-section">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{getStepText(currentStep)}</p>
    </div>
  );
};

export default ProgressSection; 