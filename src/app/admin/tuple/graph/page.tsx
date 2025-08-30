import { Tuple } from "@/app/admin/tuple/columns";
import Graph from "./Graph";
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

export default async function GraphPage() {
  const data = await getData();
  console.log("Rendering GraphPage");

  return (
    <div id="graph-container" className="h-full w-full">
      <Graph data={data} />
    </div>
  );
}
