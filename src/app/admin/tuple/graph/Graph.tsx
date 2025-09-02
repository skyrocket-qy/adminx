"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { Tuple } from '@/app/admin/tuple/columns';

interface NodeType extends SimulationNodeDatum {
  id: string;
  name: string;
}

interface GraphProps {
  data: Tuple[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && ref.current) {
      const nodes = new Map<string, NodeType>();
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
          source: nodes.get(sourceId)!,
          target: nodes.get(targetId)!,
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
        .force('link', d3.forceLink(links).id((d: d3.SimulationNodeDatum) => (d as NodeType).id).distance(250))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(40));

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
        .style("paint-order", "stroke")
        .style("stroke", "white")
        .style("stroke-width", "3px")
        .text(d => d.relation);

      const node: d3.Selection<SVGCircleElement, NodeType, SVGGElement, unknown> = svg.append('g')
        .selectAll<SVGCircleElement, NodeType>('circle')
        .data(nodes.values())
        .join('circle')
        .attr('r', 20)
        .attr('fill', '#69b3a2')
        .call(d3.drag<SVGCircleElement, NodeType>()
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
        .style("paint-order", "stroke")
        .style("stroke", "white")
        .style("stroke-width", "3px")
        .text(d => d.name);

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x || 0)
          .attr('y1', d => d.source.y || 0)
          .attr('x2', d => d.target.x || 0)
          .attr('y2', d => d.target.y || 0);

        linkText
          .attr("x", d => ((d.source.x || 0) + (d.target.x || 0)) / 2)
          .attr("y", d => ((d.source.y || 0) + (d.target.y || 0)) / 2);

        node
          .attr('cx', d => d.x || 0)
          .attr('cy', d => d.y || 0);

        nodeText
          .attr("x", d => d.x || 0)
          .attr("y", d => d.y || 0);
      });

      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>, d: NodeType) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>, d: NodeType) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, NodeType, NodeType>, d: NodeType) {
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
