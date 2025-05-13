import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as transformers from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";
import * as umap from "https://cdn.skypack.dev/umap-js@1.3.3";

const extractor = await transformers.pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
    { quantized: false }
    )

// const text = "This is a test sentence.";
// const features = await extractor(text);
// console.log(features);

const processor = (() => {
    var ns = {}; // Namespace
    ns.docCount = 0;
    ns.docsToEmbed = [];
    ns.embeddedDocs = [];
    ns.sigmaInstance = undefined;
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
        
        ns.docsToEmbed = data;
        ns.docCount = data.length;
        
        // Loadbar
        const progressBar = document.querySelector('#embeddings-progress-bar');
        progressBar.textContent = `0/${data.length} documents embedded`;

        // Allow the UI to update before starting the async operation
        setTimeout(() => {
          ns.embedNextDoc()
            .catch(error => {
              console.error('Error embedding documents:', error);
            });
        }, 100);
    };

    ns.embedNextDoc = async function() {
        if (ns.docsToEmbed.length > 0) {
            const doc = this.docsToEmbed.shift();
            console.log("Embedding", doc.Title, "... (" + ns.docsToEmbed.length + " remaining)");
            const features = await extractor(doc.Text, { pooling: "mean", normalize: true });
            ns.embeddedDocs.push({
                "doc": doc,
                "v": features
            });

            // Loadbar
            const progressBar = document.querySelector('#embeddings-progress-bar');
            progressBar.textContent = `${ns.embeddedDocs.length}/${ns.embeddedDocs.length+ns.docsToEmbed.length} documents embedded`;
            progressBar.style.width = `${Math.ceil(100 * ns.embeddedDocs.length / (ns.embeddedDocs.length+ns.docsToEmbed.length))}%`

            // Allow the UI to update before starting the async operation
            setTimeout(() => {
              ns.embedNextDoc()
                .catch(error => {
                  console.error('Error embedding documents:', error);
                });
            }, 100);
        } else {
            console.log("All documents processed.");

            // Allow the UI to update before starting the async operation
            setTimeout(() => {
              ns.flatten()
                .catch(error => {
                  console.error('Error reducing dimensionality:', error);
                });
            }, 100);
        }
    };
    ns.flatten = async function() {
        const epochs = Math.min(1000, 50*ns.docCount)
        const embeddings = ns.embeddedDocs.map((d)=>d.v.data);
        const umapper = new umap.UMAP({
            nComponents: 2,
            minDist: 0.1,
            nNeighbors: Math.min(8, ns.docCount-1),
            nEpochs: epochs,
        })
        const projection = await umapper.fitAsync(embeddings, epochNumber => {
            if (epochNumber%100 == 0 || epochNumber==epochs) {
                setTimeout(() => {
                    // Loadbar
                    const percent = Math.ceil(100 * epochNumber / epochs)
                    const progressBar = document.querySelector('#umap-progress-bar');
                    progressBar.textContent = `${percent}% 2D projection`;
                    progressBar.style.width = `${percent}%`
                }, 100);
            }
        })

        ns.integrateProjection(projection);
        ns.vis();
    };
    ns.integrateProjection = function(projection) {
        for (let i in ns.embeddedDocs) {
            ns.embeddedDocs[i].x = projection[i][0];
            ns.embeddedDocs[i].y = projection[i][1];
        }
    };
    ns.vis = function() {
        console.log(">", ns.embeddedDocs)

        // Compute categories
        var categoriesIndex = {}
        ns.embeddedDocs.forEach((d,i) => {
            const cat = d.doc.Category
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
        
        // Create network
        const g = new graphology.Graph();
        ns.embeddedDocs.forEach((d,i) => {
            const color = categoriesIndex[d.doc.Category].color
            g.addNode(i, {label: d.doc.Title, x:d.x, y:d.y, size:30, color:color})
        })

        if (ns.sigmaInstance) {
            ns.sigmaInstance.kill()
        }
        ns.sigmaInstance = new Sigma(g, document.getElementById("sigmaContainer"));
    };
    return ns;
})();

// Load csv file
d3.csv("test/genocide.csv")
    .then(processor.init)
    .catch(function(error) {
        console.log(error);
    });

    