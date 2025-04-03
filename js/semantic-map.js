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
        ns.embedNextDoc();

        // let projection = [
        //     [-3.1714369016815254, -7.475679893073411],
        //     [-2.0035443138876925, -5.888052779889111],
        //     [-3.007152629814964, -7.850578286476373],
        //     [-2.7426828694509484, -6.011778689629628],
        //     [-2.2421134060634915, -6.928525854872057],
        //     [-2.655162344680103, -7.306464293408742],
        //     [-3.0428725157229524, -6.520761481044093],
        //     [-2.152243971028823, -6.402741137222516],
        //     [-1.875808056404194, -5.442310708523259],
        //     [-2.4944082863040853, -7.914464099136181],
        //     [-0.06985479089812538, -4.7922323396471125],
        //     [-0.6326100110975504, -3.829008652575101],
        //     [0.029310930739031994, -4.160725790439101],
        //     [0.49696808203395615, -5.074900363191845],
        //     [-1.078042432244016, -3.9805734756232702],
        //     [-0.5633475259921292, -4.7687203489382215],
        //     [0.6929975352279846, -4.423275701600571],
        //     [0.6958619267592293, -3.594443712299577],
        //     [0.1313692719775703, -3.607204573136327],
        //     [0.8688565442390246, -3.862513454854215]
        // ];
        // ns.embeddedDocs = ns.docsToEmbed.map(doc => { return {
        //     "doc": doc,
        //     "v": []
        // }});
        // ns.integrateProjection(projection);
        // ns.vis();
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
            ns.embedNextDoc()
        } else {
            console.log("All documents processed.");
            ns.flatten();
        }
    };
    ns.flatten = function() {
        const embeddings = ns.embeddedDocs.map((d)=>d.v.data);
        const projection = new umap.UMAP({
            nComponents: 2,
            minDist: 0.1,
            nNeighbors: 4,
        }).fit(embeddings)
        // console.log("Projection:\n[", projection.map(d=>'['+d[0]+', '+d[1]+']').join(",\n"),']');
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

    