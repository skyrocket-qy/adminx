import { GraphData } from "./type";

export const mockHRBACGraph: GraphData = {
    nodes: [
      // Roles (Layer 1 to 6)
      { id: "r1", name: "Admin", class: "role" },
      { id: "r2", name: "CEO", class: "role" },
      { id: "r3", name: "CTO", class: "role" },
      { id: "r4", name: "TeamLead", class: "role" },
      { id: "r5", name: "SeniorStaff", class: "role" },
      { id: "r6", name: "JuniorStaff", class: "role" },

      { id: "r7", name: "PM", class: "role" },
  
      // Object Sets (Layer 7)
      { id: "os1", name: "HRDocuments", class: "object_set" },
      { id: "os2", name: "DevResources", class: "object_set" },
  
      // Objects (Layer 8)
      { id: "o1", name: "EmployeeContract.pdf", class: "object" },
      { id: "o2", name: "PayrollSystem", class: "object" },
      { id: "o3", name: "InternalWiki", class: "object" },
      { id: "o4", name: "GitRepository", class: "object" },
    ],
  
    edges: [
      // Role hierarchy (inheritance from top to bottom)
      { from: "r1", to: "r2", weight: 1, relation: "inherits" },
      { from: "r2", to: "r3", weight: 1, relation: "inherits" },
      { from: "r3", to: "r4", weight: 1, relation: "inherits" },
      { from: "r4", to: "r5", weight: 1, relation: "inherits" },
      { from: "r5", to: "r6", weight: 1, relation: "inherits" },
  
      // Role to ObjectSet permissions
      { from: "r2", to: "os1", weight: 2, relation: "can-access" },
      { from: "r4", to: "os2", weight: 2, relation: "can-access" },
  
      // ObjectSet to Object mapping
      { from: "os1", to: "o1", weight: 1, relation: "contains" },
      { from: "os1", to: "o2", weight: 1, relation: "contains" },
      { from: "os2", to: "o3", weight: 1, relation: "contains" },
      { from: "os2", to: "o4", weight: 1, relation: "contains" },
    ]
  };
  