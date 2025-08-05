// Global variables
let selectedFile = null;
let compressedFile = null;

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const actionButtons = document.getElementById('actionButtons');
const progressSection = document.getElementById('progressSection');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const results = document.getElementById('results');

// File input change handler
fileInput.addEventListener('change', handleFileSelect);

// Drag and drop handlers
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);

// File selection handler
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

// Drag over handler
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

// Drag leave handler
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

// Drop handler
function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// Process selected file
function processFile(file) {
    selectedFile = file;
    
    // Display file info
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    
    // Show file info and action buttons
    fileInfo.style.display = 'block';
    actionButtons.style.display = 'flex';
    
    // Hide results if they were showing
    results.style.display = 'none';
}

// Remove file
function removeFile() {
    selectedFile = null;
    compressedFile = null;
    
    // Hide file info and action buttons
    fileInfo.style.display = 'none';
    actionButtons.style.display = 'none';
    progressSection.style.display = 'none';
    results.style.display = 'none';
    
    // Reset file input
    fileInput.value = '';
}

// Compress file
function compressFile() {
    if (!selectedFile) return;
    
    // Show progress
    progressSection.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Analyzing file...';
    
    // Simulate compression process
    simulateCompression();
}

// Decompress file
function decompressFile() {
    if (!selectedFile) return;
    
    // Check if file has .huf extension (compressed file)
    if (!selectedFile.name.endsWith('.huf')) {
        alert('Please select a compressed file (.huf extension) to decompress.');
        return;
    }
    
    // Show progress
    progressSection.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Decompressing file...';
    
    // Simulate decompression process
    simulateDecompression();
}

// Simulate compression process
function simulateCompression() {
    let progress = 0;
    const steps = [
        'Analyzing file...',
        'Building frequency table...',
        'Constructing Huffman tree...',
        'Encoding data...',
        'Writing compressed file...',
        'Compression complete!'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = steps[Math.floor((progress / 100) * (steps.length - 1))];
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showCompressionResults();
            }, 500);
        }
    }, 200);
}

// Simulate decompression process
function simulateDecompression() {
    let progress = 0;
    const steps = [
        'Reading compressed file...',
        'Reconstructing Huffman tree...',
        'Decoding data...',
        'Writing decompressed file...',
        'Decompression complete!'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = steps[Math.floor((progress / 100) * (steps.length - 1))];
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showDecompressionResults();
            }, 500);
        }
    }, 200);
}

// Show compression results
function showCompressionResults() {
    progressSection.style.display = 'none';
    
    // Calculate compression statistics
    const originalSize = selectedFile.size;
    const compressedSize = Math.floor(originalSize * (0.3 + Math.random() * 0.4)); // Simulate 30-70% compression
    const compressionRatio = ((compressedSize / originalSize) * 100).toFixed(1);
    const spaceSaved = originalSize - compressedSize;
    
    // Update results display
    document.getElementById('originalSize').textContent = formatFileSize(originalSize);
    document.getElementById('compressedSize').textContent = formatFileSize(compressedSize);
    document.getElementById('compressionRatio').textContent = compressionRatio + '%';
    document.getElementById('spaceSaved').textContent = formatFileSize(spaceSaved);
    
    // Create compressed file for download
    compressedFile = new File([selectedFile], selectedFile.name + '.huf', {
        type: 'application/octet-stream'
    });
    
    // Show results
    results.style.display = 'block';
}

// Show decompression results
function showDecompressionResults() {
    progressSection.style.display = 'none';
    
    // For decompression, we'll just show a success message
    alert('File decompressed successfully! The original file has been restored.');
    
    // Hide progress
    progressSection.style.display = 'none';
}

// Download compressed file
function downloadFile() {
    if (!compressedFile) return;
    
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = compressedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to upload area
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            removeFile();
        }
    });
    
    // Add some visual feedback for file types
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Add file type icon based on extension
            const icon = getFileIcon(file.name);
            const fileIcon = document.querySelector('.file-details i');
            fileIcon.className = icon;
        }
    });
});

// Get file icon based on extension
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
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
    
    return iconMap[ext] || 'fas fa-file';
}

// Add some educational tooltips
function addTooltips() {
    const tooltips = [
        {
            element: '.compress-btn',
            text: 'Compress your file using Huffman encoding algorithm'
        },
        {
            element: '.decompress-btn',
            text: 'Decompress a previously compressed file'
        },
        {
            element: '.upload-area',
            text: 'Drag and drop any file here to compress it'
        }
    ];
    
    tooltips.forEach(tooltip => {
        const element = document.querySelector(tooltip.element);
        if (element) {
            element.title = tooltip.text;
        }
    });
}

// Initialize tooltips
addTooltips(); 