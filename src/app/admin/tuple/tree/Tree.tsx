"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Tuple } from '@/app/admin/tuple/columns';

// Note: Removed x and y from this interface.
// D3's tree layout will calculate and add these properties to the nodes,
// so defining them here isn't necessary and can be misleading.
interface HierarchyNodeData {
  id: string;
  name: string;
  children?: HierarchyNodeData[];
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

        // Initialize nodes without x and y
        if (!nodes.has(sourceId)) {
          nodes.set(sourceId, { id: sourceId, name: sourceId, children: [] });
        }
        if (!nodes.has(targetId)) {
          nodes.set(targetId, { id: targetId, name: targetId, children: [] });
        }

        if (!childrenMap.has(sourceId)) {
          childrenMap.set(sourceId, []);
        }
        childrenMap.get(sourceId)!.push(targetId);
      });

      const buildHierarchy = (id: string): HierarchyNodeData | null => {
        const nodeData = nodes.get(id);
        if (!nodeData) return null;

        const childrenIds = childrenMap.get(id) || [];
        const children = childrenIds.map(buildHierarchy).filter((c): c is HierarchyNodeData => c !== null);

        return { ...nodeData, children: children.length > 0 ? children : undefined };
      };

      const hierarchicalData = buildHierarchy(rootNodeId);

      if (!hierarchicalData) return;

      const width = 1200;
      const height = 800;

      const svg = d3.select(ref.current)
        .attr('width', width)
        .attr('height', height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      svg.selectAll("*").remove();

      const root = d3.hierarchy<HierarchyNodeData>(hierarchicalData);
      const treeLayout = d3.tree<HierarchyNodeData>().size([height, width - 200]);

      // FIX 1: The d3.tree() layout function returns a new root node with
      // x and y coordinates computed for every node. It's crucial to
      // capture and use this return value. Your original code was calling
      // treeLayout(root) but not using its result, which caused the type errors.
      const pointRoot = treeLayout(root);

      const g = svg.append('g').attr('transform', 'translate(100,0)');

      // FIX 2: By using `pointRoot.links()`, the data is correctly typed as
      // d3.HierarchyPointLink[], where the source and target nodes are
      // guaranteed to have numeric `x` and `y` properties.
      g.selectAll('.link')
        .data(pointRoot.links())
        .enter().append('path')
        .attr('class', 'link')
        // FIX 3: Replaced `any` with the specific link data type to resolve the lint error.
        // The first generic argument is the type for the link data itself, and the second
        // is the type for the nodes within the link's `source` and `target` properties.
        .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<HierarchyNodeData>, d3.HierarchyPointNode<HierarchyNodeData>>()
          .x(d => d.y) // Swap x and y for a horizontal tree layout
          .y(d => d.x))
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2);

      const node = g.selectAll('.node')
        // Use pointRoot.descendants() for the same reasons as above.
        .data(pointRoot.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`); // d.x and d.y are guaranteed to be numbers

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

