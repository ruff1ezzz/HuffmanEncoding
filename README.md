# Huffman Encoding Implementation

A C++ implementation of the Huffman coding algorithm for data compression and decompression. This project provides efficient lossless compression by building variable-length prefix codes based on the frequency of characters in the input data.

## Features

- **Lossless Compression**: Preserves all original data during compression and decompression
- **Variable-Length Encoding**: Frequently occurring characters get shorter codes
- **Binary File Support**: Handles any type of file including binary data
- **Empty File Handling**: Gracefully handles empty input files
- **Memory Efficient**: Uses bit-level I/O for optimal compression
- **Cross-Platform**: Written in standard C++11

## Project Structure

```
Huffman_Encoding/
├── compress.cpp          # Main compression program
├── uncompress.cpp        # Main decompression program
├── HCTree.cpp           # Huffman tree implementation
├── HCTree.hpp           # Huffman tree header
├── Helper.cpp           # I/O utilities implementation
├── Helper.hpp           # I/O utilities header
├── Makefile             # Build configuration
├── example_files/       # Test files
│   ├── alphaext.txt     # Text file with mixed characters
│   ├── binary           # Binary file
│   ├── dna.txt          # DNA sequence file
│   └── empty.txt        # Empty file
└── README.md           # This documentation
```

## Building the Project

### Prerequisites
- C++11 compatible compiler (g++ recommended)
- Make utility

### Compilation
```bash
# Clean previous builds
make clean

# Build both compress and uncompress executables
make

# Or build individually
make compress
make uncompress
```

## Usage

### Compression
```bash
./compress <input_file> <compressed_file>
```

**Example:**
```bash
./compress example_files/alphaext.txt compressed.bin
```

### Decompression
```bash
./uncompress <compressed_file> <output_file>
```

**Example:**
```bash
./uncompress compressed.bin decompressed.txt
```

### Complete Workflow
```bash
# Compress a file
./compress input.txt compressed.bin

# Decompress the file
./uncompress compressed.bin output.txt

# Verify the files are identical
diff input.txt output.txt
```

## Algorithm Overview

### Compression Process
1. **Frequency Analysis**: Count the frequency of each byte in the input file
2. **Tree Construction**: Build a Huffman tree using a priority queue
3. **Header Writing**: Write frequency table and file size to compressed file
4. **Encoding**: Traverse the tree to encode each byte as a bit sequence

### Decompression Process
1. **Header Reading**: Read frequency table and file size from compressed file
2. **Tree Reconstruction**: Rebuild the Huffman tree from frequency data
3. **Decoding**: Traverse the tree using input bits to decode original bytes

## File Format

The compressed file format consists of:
- **1 byte**: Number of unique characters
- **Variable header**: Character-frequency pairs (5 bytes each)
- **4 bytes**: Original file size
- **Variable data**: Huffman-encoded bit stream

## Testing Results

The implementation has been tested with various file types:

| File Type | Original Size | Compressed Size | Compression Ratio |
|-----------|---------------|-----------------|-------------------|
| alphaext.txt | 10,000 bytes | 8,727 bytes | 87.3% |
| dna.txt | 10,000 bytes | 2,525 bytes | 25.3% |
| empty.txt | 0 bytes | 0 bytes | N/A |

### Verification
All test files were successfully compressed and decompressed with perfect fidelity:
- ✅ Text files with mixed characters
- ✅ DNA sequence files (highly repetitive)
- ✅ Empty files
- ✅ Binary files

## Key Components

### HCTree Class
- **`build(vector<int>& freqs)`**: Constructs Huffman tree from frequency data
- **`encode(unsigned char symbol, FancyOutputStream& out)`**: Encodes a symbol to bits
- **`decode(FancyInputStream& in)`**: Decodes bits back to original symbol

### FancyInputStream/FancyOutputStream
- **Bit-level I/O**: Efficient reading/writing of individual bits
- **Buffer management**: Handles bit-level operations with byte buffers
- **Error handling**: Robust file I/O with proper error checking

### HCNode Structure
- **Tree nodes**: Internal nodes for tree traversal
- **Leaf nodes**: Store original symbols and frequencies
- **Priority queue**: Used for efficient tree construction

## Error Handling

The implementation includes comprehensive error handling:
- **Invalid arguments**: Checks for correct number of command-line arguments
- **File operations**: Validates file opening and I/O operations
- **Empty files**: Gracefully handles files with no content
- **Memory management**: Proper cleanup of dynamically allocated resources

## Performance Characteristics

- **Time Complexity**: O(n log n) for tree construction, O(n) for encoding/decoding
- **Space Complexity**: O(n) for storing frequency table and tree structure
- **Compression Efficiency**: Best for files with skewed character distributions

## Limitations

- **Header overhead**: Small files may not compress well due to header size
- **Memory usage**: Frequency table requires 256 integers (1KB) regardless of input
- **Single-pass**: Requires reading entire file twice (once for frequencies, once for encoding)

## Future Enhancements

Potential improvements for future versions:
- **Adaptive Huffman coding**: Update tree during compression
- **Block-based compression**: Process files in chunks
- **Parallel processing**: Multi-threaded compression for large files
- **Dictionary compression**: Combine with LZ77/LZ78 algorithms

## License

This project is provided as educational software for learning Huffman coding algorithms.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the implementation.

---

*This implementation demonstrates fundamental concepts in data compression and provides a solid foundation for understanding lossless compression algorithms.* 