import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const processor = (() => {
    var ns = {}; // Namespace
    ns.data
    ns.palette = [
        "#777acd",
        "#cab21f",
        "#5ba965",
        "#ca5e4a",
        "#c55a9f",
    ]
    ns.palette_default = "#919191"
    ns.init = function(data) {
        console.log("Datapoints to process: " + data.length);
        console.log("Data", data)
        
        ns.data = data;

        ns.countWords()
    };

    ns.countWords = function() {

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
