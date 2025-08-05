import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import FileInfo from './components/FileInfo';
import ActionButtons from './components/ActionButtons';
import ProgressSection from './components/ProgressSection';
import Results from './components/Results';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

export interface FileData {
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  spaceSaved: number;
}

export interface ProcessedFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export type ProcessingStep = 
  | 'idle'
  | 'analyzing'
  | 'building_frequency'
  | 'constructing_tree'
  | 'encoding'
  | 'writing'
  | 'complete'
  | 'decompressing'
  | 'reconstructing_tree'
  | 'decoding'
  | 'writing_decompressed';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [processedFile, setProcessedFile] = useState<ProcessedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CompressionResult | undefined>(undefined);
  const [isCompressed, setIsCompressed] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const fileData: FileData = {
      file,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream'
    };
    setSelectedFile(fileData);
    setResults(undefined);
    setProcessedFile(null);
    setIsCompressed(false);
  }, []);

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setProcessedFile(null);
    setResults(undefined);
    setCurrentStep('idle');
    setProgress(0);
    setIsCompressed(false);
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setCurrentStep('analyzing');
    setProgress(0);

    // Simulate compression process
    const steps: ProcessingStep[] = [
      'analyzing',
      'building_frequency',
      'constructing_tree',
      'encoding',
      'writing',
      'complete'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i / (steps.length - 1)) * 100);
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    }

    // Calculate compression results
    const originalSize = selectedFile.size;
    const compressedSize = Math.floor(originalSize * (0.3 + Math.random() * 0.4));
    const compressionRatio = (compressedSize / originalSize) * 100;
    const spaceSaved = originalSize - compressedSize;

    const compressionResult: CompressionResult = {
      originalSize,
      compressedSize,
      compressionRatio,
      spaceSaved
    };

    // Create compressed file
    const compressedFile = new File([selectedFile.file], selectedFile.name + '.huf', {
      type: 'application/octet-stream'
    });

    const processedFileData: ProcessedFile = {
      file: compressedFile,
      name: compressedFile.name,
      size: compressedFile.size,
      type: 'application/octet-stream'
    };

    setResults(compressionResult);
    setProcessedFile(processedFileData);
    setIsCompressed(true);
    setIsProcessing(false);
  }, [selectedFile]);

  const handleDecompress = useCallback(async () => {
    if (!selectedFile || !selectedFile.name.endsWith('.huf')) {
      alert('Please select a compressed file (.huf extension) to decompress.');
      return;
    }

    setIsProcessing(true);
    setCurrentStep('decompressing');
    setProgress(0);

    // Simulate decompression process
    const steps: ProcessingStep[] = [
      'decompressing',
      'reconstructing_tree',
      'decoding',
      'writing_decompressed',
      'complete'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i / (steps.length - 1)) * 100);
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 800));
    }

    // Create decompressed file (simulate original file)
    const originalName = selectedFile.name.replace('.huf', '');
    const decompressedFile = new File([selectedFile.file], originalName, {
      type: 'application/octet-stream'
    });

    const processedFileData: ProcessedFile = {
      file: decompressedFile,
      name: decompressedFile.name,
      size: decompressedFile.size,
      type: 'application/octet-stream'
    };

    setProcessedFile(processedFileData);
    setIsCompressed(false);
    setIsProcessing(false);
    setCurrentStep('idle');
    setProgress(0);
  }, [selectedFile]);

  const handleDownload = useCallback(() => {
    if (!processedFile) return;

    const url = URL.createObjectURL(processedFile.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [processedFile]);

  return (
    <div className="App">
      <div className="container">
        <Header />
        
        <main>
          <UploadSection onFileSelect={handleFileSelect} />
          
          {selectedFile && (
            <FileInfo 
              file={selectedFile} 
              onRemove={handleFileRemove} 
            />
          )}
          
          {selectedFile && !isProcessing && (
            <ActionButtons 
              onCompress={handleCompress}
              onDecompress={handleDecompress}
              isCompressedFile={selectedFile.name.endsWith('.huf')}
            />
          )}
          
          {isProcessing && (
            <ProgressSection 
              currentStep={currentStep}
              progress={progress}
            />
          )}
          
          {processedFile && (
            <Results 
              results={results}
              processedFile={processedFile}
              isCompressed={isCompressed}
              onDownload={handleDownload}
            />
          )}
        </main>

        <InfoSection />
        <Footer />
      </div>
    </div>
  );
};

export default App; 