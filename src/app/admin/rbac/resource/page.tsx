import { DataTable } from "./data-table"
import {  Resource, columns } from "./columns"

// async function getData(): Promise<Resource[]> {
//
//   // const out = "";
//   //   pager: {
//   //     size: 50,
//   //   }
//   // })

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