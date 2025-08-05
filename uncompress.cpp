#include "HCTree.hpp"
#include "Helper.hpp"
#include <fstream>
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, char* argv[]) {
    if (argc != 3) {
        cerr << "Error: " << "Incorrect parameters" << endl;
        cerr << "Correct form: " << argv[0] << " <compressed_file> <uncompressed_file>" << endl;
        return 1;
    }

    // opening input and output files
    FancyInputStream fIn(argv[1]);
    FancyOutputStream fOut(argv[2]);

    // handle empty input file
    if (fIn.filesize() == 0) {
        return 0;
    }

    vector<int> freq(256, 0);
    int count = fIn.read_byte();

    // read file header at the start of input file and construct HCTree
    for (int i = 0; i < count; i++) {
        unsigned char s = fIn.read_byte();
        int frequency = fIn.read_int();
        freq[s] = frequency;
    }

    HCTree hcTree;
    hcTree.build(freq);

    /* 
     * Use HCTree to decode the bits from input file and append 
     * it to output file in the appropriate sequence of bytes
     */
    int sCount = fIn.read_int();
    for (int i = 0; i < sCount; i++) {
        unsigned char ch = hcTree.decode(fIn);
        fOut.write_byte(ch);
    }
    
    return 0;
}
