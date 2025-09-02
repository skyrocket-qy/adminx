"use client"

import { Tuple } from "@/app/admin/tuple/columns";
import Tree from "./Tree";
import { useEffect, useState } from "react";
// import { client } from "@/services/connect/client";
// import { protoTuple } from "@/lib/protos/authzpb/v1/authz_pb";

async function getData(): Promise<Tuple[]> {
  // Fetch data from your API here.

  // let out = await client.listTuples({
  //   cursor: {
  //     size: 50,
  //   }
  // })


  // let  protoTuples = out.tuples;

  // const tuples: Tuple[] = protoTuples.map((protoTuple) => {
  //   return {
  //     sbjNs: protoTuple.sbjNs,
  //     sbjId: protoTuple.sbjId,
  //     relation: protoTuple.rel,
  //     objNs: protoTuple.objNs,
  //     objId: protoTuple.objId,
  //   }
  // })

  // return tuples;
  return [
    { sbjNs: "user", sbjId: "alice",    relation: "member", objNs: "role", objId: "admin" },
    { sbjNs: "user", sbjId: "bob",      relation: "member", objNs: "role", objId: "editor" },
    { sbjNs: "user", sbjId: "charlie",  relation: "member", objNs: "role", objId: "viewer" },
    { sbjNs: "user", sbjId: "david",    relation: "member", objNs: "role", objId: "editor" },
    { sbjNs: "user", sbjId: "eva",      relation: "member", objNs: "role", objId: "admin" },

    // --------------- role to permission grants ---------------
    { sbjNs: "role", sbjId: "admin",   relation: "read",   objNs: "document", objId: "55"  },
    { sbjNs: "role", sbjId: "admin",   relation: "write",  objNs: "document", objId: "55"  },
    { sbjNs: "role", sbjId: "admin",   relation: "delete", objNs: "document", objId: "55"  },

    { sbjNs: "role", sbjId: "editor",  relation: "read",   objNs: "document", objId: "12"  },
    { sbjNs: "role", sbjId: "editor",  relation: "write",  objNs: "document", objId: "12"  },

    { sbjNs: "role", sbjId: "viewer",  relation: "read",   objNs: "document", objId: "12"  },
    { sbjNs: "role", sbjId: "viewer",  relation: "read",   objNs: "document", objId: "55"  },

    // --------------- add some different resources ---------------
    { sbjNs: "role", sbjId: "editor",  relation: "read",   objNs: "image",    objId: "3"   },
    { sbjNs: "role", sbjId: "admin",   relation: "delete", objNs: "image",    objId: "3"   },
    { sbjNs: "role", sbjId: "viewer",  relation: "read",   objNs: "report",   objId: "2024" },
    { sbjNs: "role", sbjId: "admin",   relation: "write",  objNs: "report",   objId: "2024" }
  ]
}

export default function TreePage() {
  const [data, setData] = useState<Tuple[]>([]);
  const [rootNode, setRootNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<string[]>([]);

  useEffect(() => {
    getData().then(data => {
      setData(data);
      const allNodes = new Set<string>();
      data.forEach(d => {
        allNodes.add(`${d.sbjNs}:${d.sbjId}`);
        allNodes.add(`${d.objNs}:${d.objId}`);
      });
      const nodesArray = Array.from(allNodes);
      setNodes(nodesArray);
      setRootNode(nodesArray[0] || null);
    });
  }, []);

  const handleRootChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRootNode(event.target.value);
  };

  return (
    <div className="h-full w-full">
      <div className="p-4">
        <label htmlFor="root-node-select" className="mr-2">Root Node:</label>
        <select id="root-node-select" onChange={handleRootChange} value={rootNode || ''}>
          {nodes.map(node => (
            <option key={node} value={node}>{node}</option>
          ))}
        </select>
      </div>
      <div id="tree-container" className="h-full w-full">
        {rootNode && <Tree data={data} rootNodeId={rootNode} />}
      </div>
    </div>
  );
}
