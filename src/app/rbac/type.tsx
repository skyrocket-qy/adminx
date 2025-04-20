type NodeClass = 'role' | 'object' | 'object_set' | 'user';

export interface GraphNode {
  id: string;
  name: string;
  class: NodeClass;
}

export interface GraphEdge {
  from: string; // source node id
  to: string;   // destination node id
  weight: number;
  relation: string; // 'inherits', 'can-access', etc.
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
