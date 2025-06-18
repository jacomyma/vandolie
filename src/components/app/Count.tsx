import { type SizeState, withSize } from "@ouestware/hoc";
import { axisBottom, axisLeft, scaleBand, scaleLinear, select, stack } from "d3";
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useAppContext } from "../../core/context.ts";
import { computeTopWords, countCategories, extractPassage } from "../../core/wordsCount.ts";

const CategoriesChart = withSize<{ categories: ReturnType<typeof countCategories> } & SizeState>(
  ({ categories, width: containerWidth }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || categories.length === 0) return;

      // Clear previous chart
      select(svgRef.current).selectAll("*").remove();

      const barHeight = 32;
      const barSpacing = 6;

      // Set dimensions and margins
      const margin = { top: 6, right: 12, bottom: 18, left: 180 };
      const width = containerWidth - margin.left - margin.right;
      const height = categories.length * (barHeight + barSpacing);

      // Create SVG
      const svg = select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      // Add Y axis
      const y = scaleBand()
        .domain(categories.map((c) => c.id))
        .range([height, 0])
        .padding(0.2);

      g.append("g").call(axisLeft(y).tickSizeOuter(0));

      // Add X axis
      const x = scaleLinear().domain([0, 100]).range([0, width]);

      g.append("g").attr("transform", `translate(0,${height})`).call(axisBottom(x));

      // Build data
      const data = categories.map((c) => ({
        present: (100 * c.matches) / c.count,
        absent: (100 * (c.count - c.matches)) / c.count,
        id: c.id,
        color: c.color,
      }));

      // Stack the data
      const stackedData = stack<(typeof data)[number]>().keys(["present"])(data);

      // Show the bars
      g.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr("y", (d) => y(d.data.id)!)
        .attr("x", (d) => x(d[0]))
        .attr("fill", (d) => d.data.color)
        .attr("height", y.bandwidth())
        .attr("width", (d) => x(d[1]) - x(d[0]));

      // Add percentage labels
      g.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("y", (d) => y(d.id)! + y.bandwidth() / 2)
        .attr("x", (d) => x(d.present / 2))
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("text-shadow", "1px 1px 1px rgba(0,0,0,0.5)")
        .text((d) => `${d.present.toFixed(0)}%`)
        .style("display", (d) => (d.present < 5 ? "none" : "block"));
    }, [categories, containerWidth]);

    return <svg ref={svgRef} className="w-full"></svg>;
  },
);

export const CountComponent: FC = () => {
  const { dataset } = useAppContext();
  const [computed, setComputed] = useState<null | {
    query: string;
    exactWordOnly: boolean;
    categories: ReturnType<typeof countCategories>;
  }>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [exactWordOnly, setExactWordOnly] = useState(false);
  const topWords = useMemo(() => computeTopWords(dataset, exactWordOnly), [dataset, exactWordOnly]);

  const compute = useCallback(
    ({
      newQuery = query,
      newExactWordOnly = exactWordOnly,
    }: { newQuery?: string; newExactWordOnly?: boolean } = {}) => {
      setQuery(newQuery);
      setExactWordOnly(newExactWordOnly);

      if (!newQuery) {
        setComputed(null);
      } else {
        setComputed({
          query: newQuery,
          exactWordOnly,
          categories: countCategories(dataset, newQuery, newExactWordOnly),
        });
      }
    },
    [query, exactWordOnly, dataset],
  );

  return (
    <main>
      <div className="container bg-body pb-4">
        <div className="container pt-4">
          <h1>Count the words</h1>

          <div className="card">
            <div className="card-header">Settings: what word to count?</div>
            <div className="card-body">
              <form
                className="input-group mb-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  compute();
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Word to search and count"
                  aria-label="Word to search and count"
                  aria-describedby="button-search"
                  id="input-search"
                  value={query || ""}
                  onChange={(e) => setQuery(e.target.value || undefined)}
                />
                <button type="submit" className="btn btn-primary" id="button-search">
                  Search and count
                </button>
              </form>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-full-words"
                  checked={exactWordOnly}
                  onChange={(e) => {
                    compute({ newExactWordOnly: e.target.checked });
                  }}
                />
                <label className="form-check-label" htmlFor="settings-full-words">
                  Exact word
                </label>
              </div>
              {topWords && (
                <>
                  <h5 className="mt-3">
                    Top words <span className="opacity-50">(click to search)</span>
                  </h5>
                  <div id="top-words">
                    {topWords.map(({ word, count }) => (
                      <button
                        key={word}
                        className="btn btn-outline-secondary btn-sm m-1"
                        onClick={() => {
                          compute({ newQuery: word });
                        }}
                      >
                        {word} <span className="opacity-50">({count})</span>
                      </button>
                    ))}
                  </div>
                </>
              )}{" "}
            </div>
          </div>
        </div>

        {computed && (
          <div className="container mt-3" style={{ minHeight: 200 }}>
            <h2>Count by category</h2>
            <div id="counts-by-category">
              <CategoriesChart categories={computed.categories} />
            </div>
            <h2 className="mt-5">Details</h2>
            <div id="documents" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
              {computed.categories.flatMap((category) =>
                dataset.documents
                  .filter((doc) => doc.category === category.id)
                  .map((doc) => {
                    const result = extractPassage(doc.text.toLowerCase(), computed.query, exactWordOnly);
                    return (
                      <div className="col">
                        <div className="card shadow-sm">
                          <div className="card-header doc-title">{doc.title}</div>
                          <div className="card-body">
                            <p>
                              {result ? "..." + result.before : ""}
                              <strong>{result ? result.matched : ""}</strong>
                              {result ? result.after + "..." : ""}
                              <em className="opacity-50">{result ? "" : "Absent"}</em>
                            </p>
                            <span className="badge" style={{ backgroundColor: category.color }}>
                              {category.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }),
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
