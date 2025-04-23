"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

const data: TreeNode = {
  name: "root",
  children: [
    {
      name: "child 1",
      children: [
        { name: "child 1.1" },
        { name: "child 1.2", children: [{ name: "child 1.2.1" }] },
      ],
    },
    {
      name: "child 2",
      children: [{ name: "child 2.1" }],
    },
  ],
};

export default function HRBACTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = { width: 1000, height: 900 };

  useEffect(() => {
    const { width, height } = dimensions;
    if (!width || !height) return;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const root = d3.hierarchy<TreeNode>(data);
    const links = root.links();
    const nodes = root.descendants();

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation<d3.HierarchyNode<TreeNode>>(nodes)
      .force(
        "link",
        d3
          .forceLink<d3.HierarchyNode<TreeNode>, d3.HierarchyLink<TreeNode>>(links)
          .id((d) => d.data.name)
          .distance(50)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    g.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const node = g
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => (d.children ? "steelblue" : "lightgray"));

    node.append("title").text((d) => d.data.name);

    node
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(d.data.name)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY + 5}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    simulation.on("tick", () => {
      g.selectAll<SVGLineElement, d3.HierarchyLink<TreeNode>>("line")
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);
    });

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-amber-50 h-full w-full"
    >
      <svg ref={svgRef} />
    </div>
  );
}
