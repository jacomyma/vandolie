import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const processor = (() => {
    var ns = {}; // Namespace
    ns.data
    ns.init = function(data) {
        console.log("Datapoints to process: " + data.length);
        console.log("Data", data)
        
        ns.data = data;

        ns.makeNetwork()
    };

    ns.makeNetwork = function() {
        // Options
        const options = {
            includeTitle: document.getElementById("settings-include-title").checked,
            multiPerDoc: document.getElementById("settings-count-multi-per-doc").checked,
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
            const tokens = doc.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/);
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

            var tokens_
            if (options.multiPerDoc) {
                tokens_ = tokens
            } else {
                tokens_ = new Set(tokens)
            }

            // Count occurrences of each token
            tokens_.forEach(token => {
                const index = vocabularyArray.indexOf(token);
                counts[index]++;
            });

            return counts;
        });

        // Step 4: Count total occurrences per word
        var vocabularyData = vocabularyArray.map((token, index) => {return {index, token, count:0}})
        bagOfWords.forEach(counts => {
            for (let i in counts) {
                let count = counts[i]
                vocabularyData[i].count += count
            }
        })
        vocabularyData.sort((a,b) => {
            const diff = b.count-a.count
            if (diff == 0){
                const tA = a.token
                const tB = b.token
                if (tA < tB) return -1;
                if (tA > tB) return 1;
                return 0;
            } else return diff
        })

        // Update the interface
        document.getElementById('count-occurrences-result-count').textContent = vocabulary.size
        document.getElementById('count-occurrences-result-top-words').textContent = vocabularyData
            .filter((d,i) => i<50)
            .map((d, i) => `${i+1}. ${d.token} (${d.count})`)
            .join('\n')

        console.log(vocabularyData)
    };

    return ns;
})();

// Load csv file
d3.csv("test/genocide.csv")
    .then(processor.init)
    .catch(function(error) {
        console.log(error);
    });

// Listen to some UI stuff to re-trigger
document.getElementById("settings-include-title").addEventListener("change", processor.makeNetwork)
document.getElementById("settings-count-multi-per-doc").addEventListener("change", processor.makeNetwork)
