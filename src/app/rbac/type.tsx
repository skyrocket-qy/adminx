type NodeClass = 'role' | 'object' | 'object_set' | 'user';

export interface Node {
    id: string;
    name: string;
    class: 'role' | 'object_set' | 'object';
    layer?: number; // optional for roles
  }
  

export interface Edge {
  from: string; // source node id
  to: string;   // destination node id
  weight: number;
  relation: string; // 'inherits', 'can-access', etc.
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
} 
