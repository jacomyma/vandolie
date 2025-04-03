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
    ns.docsToEmbed = [];
    ns.embeddedDocs = [];
    ns.init = function(data) {
        console.log("Datapoints to process: " + data.length);
        
        ns.docsToEmbed = data;
        
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
        const epochs = 1000
        const embeddings = ns.embeddedDocs.map((d)=>d.v.data);
        const umapper = new umap.UMAP({
            nComponents: 2,
            minDist: 0.1,
            nNeighbors: 4,
            nEpochs: epochs,
        })
        // const projection = umapper.fit(embeddings)
        const projection = await umapper.fitAsync(embeddings, epochNumber => {
            if (epochNumber%100 == 0) {
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
        // Specify the dimensions of the chart.
        const width = 1000;
        const height = 1000;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Create the horizontal and vertical scales.
        const x = d3.scaleLinear()
            .domain(d3.extent(ns.embeddedDocs, d => d.x)).nice()
            .rangeRound([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain(d3.extent(ns.embeddedDocs, d => d.y)).nice()
            .rangeRound([height - marginBottom, marginTop]);
        
        // Ensure the x and y scales have the same ratio
        const ratio = (x.domain()[1] - x.domain()[0]) / (y.domain()[1] - y.domain()[0]);
        if (ratio > 1) {
            // x domain is larger -> adjust y domain
            const yCenter = (y.domain()[1] + y.domain()[0]) / 2;
            const yRange = (x.domain()[1] - x.domain()[0]) / ratio;
            y.domain([yCenter - yRange / 2, yCenter + yRange / 2]);
        } else {
            // y domain is larger -> adjust x domain
            const xCenter = (x.domain()[1] + x.domain()[0]) / 2;
            const xRange = (y.domain()[1] - y.domain()[0]) * ratio;
            x.domain([xCenter - xRange / 2, xCenter + xRange / 2]);
        }

        // Generate categorical color scale for modalities
        const color = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(ns.embeddedDocs.map(d => d.doc.Category));

        // Compute the density contours.
        const contours = d3.contourDensity()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .size([width, height])
            .bandwidth(50)
            .thresholds(10)
            (ns.embeddedDocs);

        // Create the SVG container.
        const svg = d3.select("#my_dataviz")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Append the axes.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())
        
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())
        
        // Tooltips
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Append the contours.
        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#DDDDDD")
            .attr("stroke-linejoin", "round")
            .selectAll()
            .data(contours)
            .join("path")
            .attr("stroke-width", (d, i) => i % 5 ? 0.25 : 1)
            .attr("d", d3.geoPath());
        
        // Append dots.
        svg.append("g")
            .attr("stroke", "white")
            .selectAll()
            .data(ns.embeddedDocs)
            .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 5)
            .attr("fill", d => color(d.doc.Category))
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.doc.Title)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
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

    