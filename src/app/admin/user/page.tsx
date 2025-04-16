import { User, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      nickname: "Jimmy",
      email: "jimmy@example.com",
    },
    {
      id: "324qd51g",
      nickname: "Jason",
      email: "jason@example.com",
    },
    {
      id: "199pg22f",
      nickname: "Mike",
      email: "mike@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
