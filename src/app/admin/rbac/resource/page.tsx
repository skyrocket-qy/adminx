import { DataTable } from "./data-table"
import { client } from "@/services/connect/rbac/client"
import {  Resource, columns } from "./columns"

async function getData(): Promise<Resource[]> {

  let out = await client.listResources({
    pager: {
      size: 50,
    }
  })

  
  let protoTuples = out.resources;

  const users: Resource[] = protoTuples.map((protoTuple) => {
    return {
      id: protoTuple.id.toString(),
      ns: protoTuple.ns,
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