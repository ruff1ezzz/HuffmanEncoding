#include "HCTree.hpp"
#include "Helper.hpp"

// traverse through the Huffman tree and delete all nodes
void destructor(HCNode*& currNode) {
    if (currNode) {
        destructor(currNode->c0);
        destructor(currNode->c1);
        delete currNode;
        currNode = nullptr;
    }
}

HCTree::~HCTree() {
    destructor(root);
}

/**
    * Use the Huffman algorithm to build a Huffman coding tree.
    * PRECONDITION: freqs is a vector of ints, such that freqs[i] is the frequency of occurrence of byte i in the input file.
    * POSTCONDITION: root points to the root of the trie, and leaves[i] points to the leaf node containing byte i.
*/
void HCTree::build(const vector<int>& freqs) {
    priority_queue<HCNode*, vector<HCNode*>, HCNodePtrComp> pq;
    
    // Creating leaf nodes
    for (unsigned int i = 0; i < freqs.size(); i++) {
        if (freqs[i] > 0) {
            HCNode* newNode = new HCNode(freqs[i], (unsigned char)i);
            leaves[i] = newNode;
            pq.push(newNode);
        }
    }

    // huffman building
    while (pq.size() > 1) {
        HCNode* left = pq.top();
        pq.pop();
        HCNode* right = pq.top();
        pq.pop();
        HCNode* combinedNode = new HCNode(left->count + right->count, left->symbol);
        combinedNode->c0 = left;
        combinedNode->c1 = right;
        left->p = combinedNode;
        right->p = combinedNode;
        pq.push(combinedNode);
    }

    // set root of huffman
    if (!pq.empty()) {
        root = pq.top();
    }
}

/**
    * Write to the given FancyOutputStream the sequence of bits coding the given symbol.
    * PRECONDITION: build() has been called, to create the coding tree, and initialize root pointer and leaves vector.
*/
void HCTree::encode(unsigned char symbol, FancyOutputStream & out) const {
    HCNode* currNode = leaves[symbol];

    vector<int> encoder; // array to keep track of the encoded symbols

    /*
     * left child -> 0
     * rigth child -> 1
     */
    while(currNode != root) {
        HCNode* parent = currNode->p;
        if (currNode == parent->c1) {
            encoder.push_back(1);
        }
        else {
            encoder.push_back(0);
        }
        currNode = parent;
    }

    for(int i = encoder.size() - 1; i >= 0; i--) {
        out.write_bit(encoder[i]);
    }
}

/**
    * Return symbol coded in the next sequence of bits from the stream.
    * PRECONDITION: build() has been called, to create the coding tree, and initialize root pointer and leaves vector.
*/
unsigned char HCTree::decode(FancyInputStream & in) const {
    if (root == nullptr) {
        return 0;
    }
    HCNode* currNode = root;
    while (currNode->c0 && currNode->c1) { 
        int currBit = in.read_bit();
        if (currBit == 1) {
            currNode = currNode->c1;
        }
        else {
            currNode = currNode->c0;
        }
    }
    return currNode->symbol;
}
