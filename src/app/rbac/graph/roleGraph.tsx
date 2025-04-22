// components/RoleGraph.tsx
'use client'

import ReactFlow, { Background, Controls, Edge, Node } from 'react-flow-renderer';

const layerSpacing = 150;
const nodeSpacing = 180;

const nodes: Node[] = [
  { id: 'r1', data: { label: 'Role 1' }, position: { x: 0 * nodeSpacing, y: 0 * layerSpacing } },
  { id: 'r2', data: { label: 'Role 2' }, position: { x: 1 * nodeSpacing, y: 1 * layerSpacing } },
  { id: 'r3', data: { label: 'Role 3' }, position: { x: 2 * nodeSpacing, y: 2 * layerSpacing } },
  { id: 'r4', data: { label: 'Role 4' }, position: { x: 0 * nodeSpacing, y: 2 * layerSpacing } },
];

const edges: Edge[] = [
  { id: 'e1-2', source: 'r1', target: 'r2' },
  { id: 'e2-3', source: 'r2', target: 'r3' },
  { id: 'e1-4', source: 'r1', target: 'r4' },
];

export default function RoleGraph() {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
