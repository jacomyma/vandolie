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

    ns.extractPassage = function(text, query, contextLength = 50) {
      // If query is a string, escape it for regex
      const pattern = typeof query === 'string' 
        ? new RegExp(`(.{0,${contextLength}})(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(.{0,${contextLength}})`, 'i')
        : new RegExp(`(.{0,${contextLength}})(${query.source})(.{0,${contextLength}})`, query.flags);
      
      const match = text.match(pattern);
      
      if (match) {
        return {
          passage: match[1] + match[2] + match[3],
          before: match[1],
          matched: match[2],
          after: match[3],
          index: match.index + match[1].length
        };
      }

      return null;
    };

    ns.countWords = function() {
        const query = document.getElementById("input-search").value
        console.log("Query:", query)

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

        if(query == "" || query === undefined) {
            return
        }

        // Respawn documents (HTML)
        // Note: in order of the categories, from most to least represented
        categories.forEach(cat => {
            ns.data
                .filter(d => {return d.Category == cat.id})
                .forEach(d => {
                    const result = ns.extractPassage(d.Text.toLowerCase(), query)

                    const color = categoriesIndex[d.Category].color
                    const div = document.createElement("div")
                    div.classList.add("col")
                    div.innerHTML = `<div class="card shadow-sm card-doc-saved">
                        <div class="card-header doc-title">
                          ${d.Title}
                        </div>
                        <div class="card-body">
                            <p>
                                ${result?'...'+result.before:''}
                                <strong>${result?result.matched:''}</strong>
                                ${result?result.after+'...':''}
                                <em style="opacity:0.5">${result?'':'Absent'}</em>
                            </p>
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
document.getElementById("button-search").addEventListener("click", processor.countWords)

