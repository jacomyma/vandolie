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
        // Compute categories
        var categoriesIndex = {}
        ns.data.forEach((d,i) => {
            const cat = d.Category
            categoriesIndex[cat] = (categoriesIndex[cat] || 0)+1
        })
        var categories = Object.entries(categoriesIndex).map(entry => {return {id:entry[0], count:entry[1]}})
        categories.sort((a,b) => b.count-a.count)
        categories.forEach((d, i) => {
            if (i<ns.palette.length) {
                d.color = ns.palette[i]
            } else {
                d.color = ns.palette_default
            }
            categoriesIndex[d.id] = d
        })
        categories.reverse()

        // Delete documents (HTML)
        document.getElementById("documents").innerHTML = "";

        // Respawn documents (HTML)
        // Note: in order of the categories, from most to least represented
        categories.forEach(cat => {
            ns.data
                .filter(d => {return d.Category == cat.id})
                .forEach(d => {
                    const color = categoriesIndex[d.Category].color
                    const div = document.createElement("div")
                    div.classList.add("col")
                    div.innerHTML = `<div class="card shadow-sm card-doc-saved">
                        <div class="card-header doc-title">
                          ${d.Title}
                        </div>
                        <div class="card-body">
                            <span class="badge" style="background-color:${color};">${d.Category}</span>
                        </div>
                    </div>`

                    document.getElementById("documents").appendChild(div);
                })
        })
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
