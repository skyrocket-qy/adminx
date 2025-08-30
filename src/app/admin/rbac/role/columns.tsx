"use client"

import { ColumnDef,
} from "@tanstack/react-table"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"

import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UInt64Value } from "@bufbuild/protobuf/wkt"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Role = {
  id: string
  name: string
}

export const columns: ColumnDef<Role>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    // header: "SbjId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) => column.toggleSorting(undefined, e.shiftKey)}
        >
          name
        {column.getIsSorted() === "asc" && <ArrowUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ArrowDown className="h-4 w-4" />}
        {column.getIsSorted() === false && <ArrowUpDown className="h-4 w-4" />}
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                // const tupleStr = `${user.sbjNs}:${user.sbjId}#${user.relation}@${user.objNs}:${user.objId}`;
                // navigator.clipboard.writeText(tupleStr);
              }}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
