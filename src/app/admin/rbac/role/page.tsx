import { DataTable } from "./data-table"
import { client } from "@/services/connect/rbac/client"
import {  Role, columns } from "./columns"

async function getData(): Promise<Role[]> {

  let out = await client.listRoles({
    pager: {
      size: 50,
    }
  })

  
  let protoTuples = out.roles;

  const users: Role[] = protoTuples.map((protoTuple) => {
    return {
      id: protoTuple.id.toString(),
      name: protoTuple.name,
    }
  })

  return users;
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="h-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}