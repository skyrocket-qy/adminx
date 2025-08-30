"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useLayoutEffect } from "react";
import { toast } from 'react-toastify';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { CreateRoleDrawer } from "./drawer"
import { Input } from "@/components/ui/input"
import { client } from "@/services/connect/rbac/client";
import { Role } from "./columns";
import { parseQueryStringToAST } from "@/lib/ast";
import clsx from "clsx"; // optional: helps manage conditional class names
import { ArrowUpDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    });


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: (updater) => {
            const newSorting =
                typeof updater === "function" ? updater(sorting) : updater;

            setSorting(newSorting);

            // log to console
            console.log("Sorting changed:", newSorting);

            // optional: store somewhere for your query
            // queryStore.sorting = newSorting;
        },
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          sorting,
          columnFilters,
          pagination,
          rowSelection,
        },
        enableMultiSort: true,
    })
    
    const [queryInput, setQueryInput] = useState<string>("");
    const [parseError, setParseError] = useState<string | null>(null);
    const [triggerShake, setTriggerShake] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
        console.log("Query input:", queryInput);
        try{
            const ast = parseQueryStringToAST(queryInput);
            setParseError(null);
        }catch(e: any){
            console.error(e);
            setParseError(e.message || "Invalid query syntax");
            setTriggerShake(true);
            setTimeout(() => setTriggerShake(false), 500); 
        }

    }, 500);

    return () => clearTimeout(timer);
    }, [queryInput, table]);

  return (
    <div className="h-full flex flex-col">
        <div className="flex items-center justify-between pb-4">
            {/* <Select>
                <SelectTrigger className="w-[100px] bg-violet-100">
                    <SelectValue placeholder="Column" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SbjNs">SbjNs</SelectItem>
                    <SelectItem value="SbjId">SbjId</SelectItem>
                    <SelectItem value="Relation">Relation</SelectItem>
                    <SelectItem value="ObjNs">ObjNs</SelectItem>
                    <SelectItem value="ObjId">ObjId</SelectItem>
                </SelectContent>
            </Select> */}
            <Input
                placeholder="SbjNs = 123 & Relation = member"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className={clsx(
                    "max-w-sm transition-all duration-300",
                    parseError && "border border-red-500",
                    triggerShake && "animate-shake"
                )}
            />
            <Button 
                className="ml-1"
                disabled = {queryInput.length === 0}
            >
                Delete all
            </Button>
            <Button
                className="mr-1 ml-auto bg-violet-600 "
                onClick={() => {}}
            >
                Reset
                <ArrowUpDown/>
            </Button>
            <Button 
                className=" mr-1 bg-black"
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                onClick={async () => {
                    const selected = table.getFilteredSelectedRowModel().rows as { original: Role }[]
                    try {
                        const out = await client.deleteRole({
                        });
                        toast.success("Role delete successfully!");
                    } catch (e) {
                        toast.error("Failed to delelte tuple.");
                    }
                }}
            >
            Delete
            </Button>
            <CreateRoleDrawer />
        </div>
        <div className="rounded-md border h-full flex-grow overflow-auto">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-2 pb-0">
            <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                {" "} (total: {table.getPrePaginationRowModel().rows.length})
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </div>
  )
}
