"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Faculty } from "@prisma/client";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import columns from "./columns";

interface TableProps {
  groups: FullGroupType[];
}

const GroupTable = ({ groups }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data: groups,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination,
    },
  });

  return (
    <>
      <div className="rounded-md border mt-10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white bg-transparent"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    row.getIsSelected() ? "bg-zinc-700" : "hover:bg-zinc-900"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of
          <span> </span>
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="text-black"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="text-black"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

// const GroupTable = ({ groups, fetchGroups }: TableProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState<FullGroupType | null>(
//     null
//   );

//   const openGroupEditModal = (group: FullGroupType) => {
//     setIsModalOpen(true);
//     setSelectedGroup(group);
//   };

//   const closeGroupEditModal = () => {
//     setIsModalOpen(false);
//     setSelectedGroup(null);
//   };

//   const tableLabels = [
//     "Id",
//     "Code",
//     "Faculty",
//     "Study Type",
//     "Grade",
//     "Users",
//     "File",
//   ];

//   return (
//     <>
//       <ScrollArea className="h-5/6 mt-10 rounded-md border border-gray-500">
//         <Table className="border-collapse text-md">
//           <TableHeader>
//             <TableRow>
//               {tableLabels.map((label) => (
//                 <TableHead key={label} className="text-white">
//                   {label}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {groups.map((group) => (
//               <GroupTableItem
//                 key={group.id}
//                 group={group}
//                 openGroupEditModal={openGroupEditModal}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </ScrollArea>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <GroupEditModal
//           group={selectedGroup!}
//           onClose={closeGroupEditModal}
//           fetchGroups={fetchGroups}
//         />
//       </Modal>
//     </>
//   );
// };

export default GroupTable;
