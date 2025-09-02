/*
"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Tuple } from '@/app/admin/tuple/columns';

interface HierarchyNodeData {
  id: string;
  name: string;
  children?: HierarchyNodeData[];
  x: number;
  y: number;
}

interface TreeProps {
  data: Tuple[];
  rootNodeId: string;
}

const Tree: React.FC<TreeProps> = ({ data, rootNodeId }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && ref.current && rootNodeId) {
      const nodes = new Map<string, HierarchyNodeData>();
      const childrenMap = new Map<string, string[]>();

      data.forEach(d => {
        const sourceId = `${d.objNs}:${d.objId}`;
        const targetId = `${d.sbjNs}:${d.sbjId}`;

        if (!nodes.has(sourceId)) {
          nodes.set(sourceId, { id: sourceId, name: sourceId, children: [], x: 0, y: 0 });
        }
        if (!nodes.has(targetId)) {
          nodes.set(targetId, { id: targetId, name: targetId, children: [], x: 0, y: 0 });
        }

        if (!childrenMap.has(sourceId)) {
          childrenMap.set(sourceId, []);
        }
        childrenMap.get(sourceId)!.push(targetId);
      });

      const buildHierarchy = (id: string): HierarchyNodeData | null => {
        const node = nodes.get(id);
        if (!node) return null;

        const childrenIds = childrenMap.get(id) || [];
        const children = childrenIds.map(buildHierarchy).filter(c => c !== null);

        return { ...node, children };
      };

      const hierarchicalData = buildHierarchy(rootNodeId);

      if (!hierarchicalData) return;

      const width = 1200;
      const height = 800;

      const svg = d3.select(ref.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove();

      const root = d3.hierarchy<HierarchyNodeData>(hierarchicalData);
      const treeLayout = d3.tree<HierarchyNodeData>().size([height, width - 200]);
      treeLayout(root as d3.HierarchyPointNode<HierarchyNodeData>);

      const g = svg.append('g').attr('transform', 'translate(100,0)');

      g.selectAll('.link')
        .data(root.links())
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<HierarchyNodeData>, HierarchyNodeData>()
          .x(d => d.y!)
          .y(d => d.x!))
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2);

      const node = g.selectAll('.node')
        .data(root.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.append('circle')
        .attr('r', 10)
        .attr('fill', '#69b3a2');

      node.append('text')
        .attr('dy', '0.31em')
        .attr('x', d => d.children ? -15 : 15)
        .attr('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name)
        .style('font-size', '12px');
    }
  }, [data, rootNodeId]);

  return (
    <svg ref={ref}></svg>
  );
};

export default Tree;
*/