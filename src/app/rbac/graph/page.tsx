"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type TreeNode = {
  name: string;
  type: string;
  level: number;
  children?: TreeNode[];
};

const data: TreeNode = {
  name: "CEO",
  type: "CEO",
  level: 0,
  children: [
    { name: "HR-Documents", type: "object", level: 5 },
    { name: "Dev-Resources", type: "object", level: 5},
    { name: "Internal-Wiki", type: "object", level: 5},
    { name: "Employee-contract", type: "object", level: 5},
    {
      name: "CTO 1",
      type: "CTO",
      level: 1,
      children: [
        { name: "HR-Documents", type: "object", level: 5},
        { name: "Dev-Resources", type: "object", level: 5},
        { name: "Internal-Wiki", type: "object", level: 5},
        { name: "Employee-contract", type: "object", level: 5},
        { name: "TeamLead 1", type: "teamlead", level: 2, children: [
          { name: "Senior 1", type: "senior" ,level: 3,}, 
          { name: "Junior 1", type: "junior" ,level: 4}
        ] },
        { name: "TeamLead 2", type: "teamlead", level: 2,children: [
          { name: "Junior 2" , type: "junior",level: 4, }, 
          { name: "Junior 3" , type: "junior",level: 4}, 
          { name: "Junior 4" , type: "junior",level: 4,}] },
      ],
    },
    {
      name: "CTO 2",
      type: "CTO",
      level: 1,
      children: [
        { name: "HR-Documents", type: "object", level: 5},
        { name: "Dev-Resources", type: "object", level: 5},
        { name: "Internal-Wiki", type: "object", level: 5},
        { name: "Employee-contract", type: "object", level: 5},
        { name: "TeamLead 3", type: "teamlead",level: 2,children: [
          { name: "HR-Documents", type: "object", level: 5},
          { name: "Dev-Resources", type: "object", level: 5},
          { name: "Employee-contract", type: "object", level: 5},
          { name: "Senior 3", type: "senior" , level: 3}, 
          { name: "Senior 4", type: "senior", level: 3,children: [
            { name: "Junior 5", type: "junior" , level: 4, children: [
              { name: "Dev-Resources", type: "object", level: 5},
            ]}, { name: "Junior 6", type: "junior", level: 4, children: [
              { name: "Dev-Resources", type: "object", level: 5},
            ]},
            { name: "HR-Documents", type: "object", level: 5},
            { name: "Dev-Resources", type: "object", level: 5},
          ] },
          { name: "Junior 7", type: "junior", level: 4, children: [
            { name: "Dev-Resources", type: "object", level: 5},
          ] },
          ] 
        },
        { name: "PM 1", type: "PM", level: 3, children: [
          { name: "HR-Documents", type: "object", level: 5},
        ]},
      ],
    },
  ],
};

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

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    const root = d3.hierarchy(data);
    
    
    const radialPoint = (x: number, y: number) => {
      return [Math.cos(x - Math.PI / 2) * y, Math.sin(x - Math.PI / 2) * y];
    };
    
    // Draw concentric layers
    const maxDepth = d3.max(root.descendants(), (d) => d.data.level)!;
    const layerRadiusStep = 80;
    const treeLayout = d3.tree<TreeNode>().size([2 * Math.PI, maxDepth * layerRadiusStep]);
    treeLayout(root);
    root.descendants().forEach((d) => {
      d.y = d.data.level * layerRadiusStep;
    });

  // add bg color
  g.append("g")
    .selectAll("path")
    .data(d3.range(1, maxDepth + 1))
    .join("path")
    .attr("d", (d) =>
      d3.arc()({
        innerRadius: (d - 1) * layerRadiusStep,
        outerRadius: d * layerRadiusStep,
        startAngle: 0,
        endAngle: 2 * Math.PI,
      } as d3.DefaultArcObject)
    )
    .attr("fill", (d) => d3.schemePastel1[(d - 1) % d3.schemePastel1.length])
    .attr("opacity", 0.4);

    g.append("g")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .attr("transform", (d) => {
      const [x, y] = radialPoint(d.x ?? 0, d.y ?? 0);
      return `translate(${x}, ${y - 10})`; // Adjust the `-10` to move label above node
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "#333")
    .text((d) => d.data.name);

    g.append("g")
      .attr("class", "layers")
      .selectAll("circle")
      .data(d3.range(1, maxDepth + 1))
      .join("circle")
      .attr("r", (d) => d * layerRadiusStep)
      .attr("fill", "none")
      .attr("stroke", (d) => d3.schemeCategory10[d % 10])
      .attr("stroke-dasharray", "4 2");

    const link = g
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", (d) => {
        const [sx, sy] = radialPoint(d.source.x ?? 0, d.source.y ?? 0);
        const [tx, ty] = radialPoint(d.target.x ?? 0, d.target.y ?? 0);
        return `M${sx},${sy}L${tx},${ty}`;
      });
    console.log(link == null)

    const node = g
      .append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("transform", (d) => {
        const [x, y] = radialPoint(d.x ?? 0, d.y ?? 0);
        return `translate(${x},${y})`;
      })
      .attr("r", 5)
      .attr("fill", (d) => (d.children ? "steelblue" : "lightgray"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Tooltip
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

    return () => {
      tooltip.remove();
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
