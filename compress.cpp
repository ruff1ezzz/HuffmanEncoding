#include "HCTree.hpp"
#include "Helper.hpp"
#include <fstream>
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
    if (argc != 3) {
        cerr << "Error: " << "Incorrect parameters" << endl;
        cerr << "Correct form: " << argv[0] << " <original_file> <compressed_file>" << endl;
        return 1;
    }

    // opening input and output files
    FancyInputStream fIn(argv[1]);
    FancyOutputStream fOut(argv[2]);
    
    // handle empty file
    if (fIn.filesize() == 0) {
        return 0;
    }

    vector<int> freq(256, 0);
    
    // reading bytes and recording the frequencies of each byte value
    while(true) {
        unsigned char ch = fIn.read_byte();
        if (fIn.good()) {
            freq[ch]++;
        }
        else {
            break;
        }
    }

    // count the number of unique non-zero bytes
    int count = 0;
    for (unsigned int i = 0; i < 256; i++) {
        if (freq[i] > 0) {
            count++;
        }
    }
    fOut.write_byte(count);

    // write file header to the output file
    for (unsigned int i = 0; i < 256; i++) {
        if (freq[i] > 0) {
            fOut.write_byte(i);
            fOut.write_int(freq[i]);
        }
    }
    fOut.write_int(fIn.filesize());

    fIn.reset();

    // build HCTree based on the frequencies of each unique byte
    HCTree hcTree;
    hcTree.build(freq);
    
    /* 
     * Use HCTree to encode the bytes from input file 
     * and append it to output file after the header 
     */
    while(true) {
        unsigned char ch = fIn.read_byte();
        if (fIn.good()) {
            hcTree.encode(ch, fOut);
        }
        else {
            break;
        }
    }

    return 0;

}
