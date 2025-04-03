import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const processor = (() => {
    var ns = {}; // Namespace
    ns.data
    ns.init = function(data) {
        console.log("Datapoints to process: " + data.length);
        console.log("Data", data)
        
        ns.data = data;

        console.log(ns.docsToBagOfWords())
    };

    ns.docsToBagOfWords = function() {
        // Options
        const options = {
            includeTitle: true,
        }

        var documents
        if (options.includeTitle) {
            documents = ns.data.map(d => d.Title+" \n"+d.Text)
        } else {
            documents = ns.data.map(d => d.Text)
        }


        // Step 1: Tokenize and create vocabulary
        const vocabulary = new Set();
        const tokenizedDocs = documents.map(doc => {
            // Tokenize: convert to lowercase, remove punctuation, split by whitespace
            const tokens = doc.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
            // Add to vocabulary
            tokens.forEach(token => vocabulary.add(token));
            return tokens;
        });

        // Step 2: Convert vocabulary Set to an Array for indexing
        const vocabularyArray = Array.from(vocabulary);

        // Step 3: Create bag of words representation for each document
        const bagOfWords = tokenizedDocs.map(tokens => {
            // Initialize counts for this document
            const counts = new Array(vocabularyArray.length).fill(0);

            // Count occurrences of each token
            tokens.forEach(token => {
                const index = vocabularyArray.indexOf(token);
                counts[index]++;
            });

            return counts;
        });

        return {
            vocabulary: vocabularyArray,
            bagOfWords: bagOfWords
        };
    };
        

    return ns;
})();

// Load csv file
d3.csv("test/genocide.csv")
    .then(processor.init)
    .catch(function(error) {
        console.log(error);
    });

    