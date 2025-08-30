import { DataTable } from "./data-table"
import { client } from "@/services/connect/rbac/client"
import {  User, columns } from "./columns"

async function getData(): Promise<User[]> {

  let out = await client.listUsers({
    pager: {
      size: 50,
    }
  })

  
  let protoTuples = out.users;

  const users: User[] = protoTuples.map((protoTuple) => {
    return {
      id: protoTuple.id.toString(),
      name: protoTuple.name,
      email: protoTuple.email,
      isActive: protoTuple.isActive,
      isEmailConfirmed: protoTuple.isEmailConfirmed,
      authTypes: protoTuple.authTypes ?? [],
      orgs: protoTuple.orgs ?? [],
      createdAt:"",
      updatedAt: "", // Fill if you have updatedAt field in proto; else empty string or null
      deletedAt: null, // same here if you have DeletedAt
      userAuths: [], // fill if you get UserAuths from proto
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