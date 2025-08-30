"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { nodes, edges, N } from "./api";

export default function HRBACTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = { width: 1600, height: 900 };

  useEffect(() => {
    const { width, height } = dimensions;
    if (!width || !height) return;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    // for each node, calculate the x, y
    const layerRadiusStep = 70 // adjust for spacing between layers

    // 1. Group by level
    const levelMap = new Map<number, N[]>();
    nodes.forEach((node) => {
      if (!levelMap.has(node.level)) levelMap.set(node.level, []);
      levelMap.get(node.level)!.push(node);
    });

    const positionedNodes = nodes.map((node) => {
      const sameLevelNodes = levelMap.get(node.level)!;
      const index = sameLevelNodes.findIndex((n) => n.id === node.id);
      const angle = (2 * Math.PI / sameLevelNodes.length) * index;
      const radius = node.level * layerRadiusStep;

      return {
        ...node,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        angle,
        radius,
      };
    });

    // Draw the node
    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
    g.selectAll("circle.node")
    .data(positionedNodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 5)
    .attr("fill", "steelblue");

    // Draw node label
    g.selectAll("text.label")
    .data(positionedNodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => d.x)
    .attr("y", d => d.y - 15)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text(d => d.id)
    .style("font-size", "10px");

    // Draw concentric circle line
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const maxLevel = d3.max(nodes, d => d.level)!; // Get max level from node data
    for (let level = 0; level <= maxLevel; level++) {
      g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", level * layerRadiusStep)
        .attr("fill", "none")
        .attr("stroke", color(level.toString())) // different color per level
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4 2"); // optional: dashed line
    }

    // Draw color between lin
    interface RingArcData {
      index: number;
    }
    
    const arc = d3.arc<RingArcData>()
      .innerRadius(d => d.index * layerRadiusStep)
      .outerRadius(d => (d.index + 1) * layerRadiusStep)
      .startAngle(0)
      .endAngle(2 * Math.PI);
    
    const levelBands = d3.range(maxLevel + 1).map(i => ({ index: i }));
    
    const levelColors = d3.scaleOrdinal<number, string>()
    .domain(d3.range(maxLevel + 1))
    .range(d3.schemePastel1); // You can choose other schemes too
    svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .selectAll("path")
      .data(levelBands)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => levelColors(d.index))
      .attr("opacity", 0.3);
  
    // Draw edges
    const nodeMap = new Map<string, { x: number; y: number }>();
    positionedNodes.forEach(node => {
      nodeMap.set(node.id, { x: node.x, y: node.y });
    });
      

    g.selectAll("line.edge")
    .data(edges)
    .enter()
    .append("line")
    .attr("class", "edge")
    .attr("x1", d => nodeMap.get(d.from)!.x)
    .attr("y1", d => nodeMap.get(d.from)!.y)
    .attr("x2", d => nodeMap.get(d.to)!.x)
    .attr("y2", d => nodeMap.get(d.to)!.y)
    .attr("stroke", "#999")
    .attr("stroke-width", 1);
    




    return () => {
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-amber-50 h-full w-full"
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}