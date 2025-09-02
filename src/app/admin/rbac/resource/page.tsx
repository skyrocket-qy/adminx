import { DataTable } from "./data-table"
import { client } from "@/services/connect/rbac/client"
import {  Resource, columns } from "./columns"

interface ProtoTuple {
  id: string | number;
  ns?: string;
  name?: string;
}

// async function getData(): Promise<Resource[]> {
//
//   // const out = "";
//   //   pager: {
//   //     size: 50,
//   //   }
//   // })

  
  const protoTuples: ProtoTuple[] = [];

  const users: Resource[] = protoTuples.map((protoTuple: ProtoTuple) => {
    return {
      id: protoTuple.id.toString(),
      ns: protoTuple.ns || '',
      name: protoTuple.name || '',
    }
  })

  // return users;
// }

export default async function Page() {
  const data: Resource[] = [];

  return (
    <div className="h-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}