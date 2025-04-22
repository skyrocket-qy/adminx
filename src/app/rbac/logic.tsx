import { mockHRBACGraph } from "./mock";
import { GraphData, Node } from "./type";

export function getLayeredGraphData(): GraphData {
    let nodes = mockHRBACGraph["nodes"];
    let edges = mockHRBACGraph["edges"];


    const parentsMap: Record<string, string[]> = {};
    const nodeMap: Record<string, Node> = {};
    for (const node of nodes) {
      nodeMap[node.id] = node;
    }
    for (const edge of edges) {
      if (edge.relation === "inherits") {
        if (!parentsMap[edge.to]) parentsMap[edge.to] = [];
        parentsMap[edge.to].push(edge.from);
      }
    }
  
    const layerMap: Record<string, number> = {};
  
    function computeLayer(nodeId: string): number {
      if (layerMap[nodeId]) return layerMap[nodeId];
      const parents = parentsMap[nodeId] || [];
      const parentLayers = parents.map(computeLayer);
      const layer = parents.length === 0 ? 1 : Math.max(...parentLayers) + 1;
      layerMap[nodeId] = layer;
      return layer;
    }
  
    for (const node of nodes) {
      if (node.class === "role") {
        node.layer = computeLayer(node.id);
      }
    }
  
    return { nodes, edges };
  }
  