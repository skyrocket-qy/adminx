import { DataTable } from "./data-table"
import { client } from "@/services/connect/rbac/client"
import {  Role, columns } from "./columns"

interface ProtoTuple {
  id: string | number;
  name?: string;
}

// async function getData(): Promise<Role[]> {
//
//   // const out = "";
//   //   pager: {
//   //     size: 50,
//   //   }
//   // })

  
//   const protoTuples: any[] = [];

//   const users: Role[] = protoTuples.map((protoTuple: ProtoTuple) => {
//     return {
//       id: protoTuple.id.toString(),
//       name: protoTuple.name,
//     }
//   })

//   return users;
// }

export default async function Page() {
  const data: Role[] = [];

  return (
    <div className="h-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}