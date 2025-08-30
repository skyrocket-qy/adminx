"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Tuple } from '@/app/admin/tuple/columns';

interface GraphProps {
  data: Tuple[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && ref.current) {
      const nodes = new Map<string, any>();
      const links = data.map(d => {
        const sourceId = `${d.sbjNs}:${d.sbjId}`;
        const targetId = `${d.objNs}:${d.objId}`;

        if (!nodes.has(sourceId)) {
          nodes.set(sourceId, { id: sourceId, name: `${d.sbjNs}: ${d.sbjId}` });
        }
        if (!nodes.has(targetId)) {
          nodes.set(targetId, { id: targetId, name: `${d.objNs}: ${d.objId}` });
        }

        return {
          source: sourceId,
          target: targetId,
          relation: d.relation,
        };
      });

      const width = 1200;
      const height = 800;

      const svg = d3.select(ref.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove();

      const simulation = d3.forceSimulation(Array.from(nodes.values()))
        .force('link', d3.forceLink(links).id((d: any) => d.id).distance(200))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', 2);

      const linkText = svg.append("g")
        .selectAll("text")
        .data(links)
        .join("text")
        .attr("class", "link-label")
        .attr("dy", -5)
        .attr("text-anchor", "middle")
        .style("fill", "#555")
        .style("font-size", "10px")
        .text(d => d.relation);

      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes.values())
        .join('circle')
        .attr('r', 20)
        .attr('fill', '#69b3a2')
        .call(d3.drag<SVGCircleElement, any>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

      const nodeText = svg.append("g")
        .selectAll("text")
        .data(nodes.values())
        .join("text")
        .attr("dy", 35)
        .attr("text-anchor", "middle")
        .style("fill", "#333")
        .style("font-size", "12px")
        .text(d => d.name);

      simulation.on('tick', () => {
        link
          .attr('x1', d => (d.source as any).x)
          .attr('y1', d => (d.source as any).y)
          .attr('x2', d => (d.target as any).x)
          .attr('y2', d => (d.target as any).y);

        linkText
          .attr("x", d => ((d.source as any).x + (d.target as any).x) / 2)
          .attr("y", d => ((d.source as any).y + (d.target as any).y) / 2);

        node
          .attr('cx', d => (d as any).x)
          .attr('cy', d => (d as any).y);

        nodeText
          .attr("x", d => (d as any).x)
          .attr("y", d => (d as any).y);
      });

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }, [data]);

  return (
    <svg ref={ref}></svg>
  );
};

export default Graph;
