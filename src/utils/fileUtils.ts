export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (filename: string): string => {
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

export const downloadFile = (file: File, filename?: string): void => {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const createSampleFile = (name: string, content: string): File => {
  const blob = new Blob([content], { type: 'text/plain' });
  return new File([blob], name, { type: 'text/plain' });
}; 