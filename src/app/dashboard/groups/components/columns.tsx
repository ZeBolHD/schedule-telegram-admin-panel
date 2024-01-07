import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Faculty } from "@prisma/client";

import { FullGroupType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import GroupCellActions from "./GroupCellActions";

const columns: ColumnDef<FullGroupType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <div className="h-full flex flex-col justify-center">
        <Checkbox
          className=" border-white"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    size: 30,
    maxSize: 30,
  },
  {
    accessorKey: "code",
    header: () => <div className="w-full text-center">Code</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("code")}</div>
    ),
  },
  {
    id: "faculty",
    accessorKey: "faculty",
    header: () => <div className="w-full text-center">Faculty</div>,
    cell: ({ row }) => {
      const facultyName = (row.getValue("faculty") as Faculty).name;

      return <div className="text-right">{facultyName}</div>;
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length == 0 || filterStatuses == "None") return true;
      const value = filterStatuses;
      const facultyId = String((row.getValue(columnId) as Faculty).id);
      return facultyId == value;
    },
  },
  {
    id: "studyType",
    accessorKey: "studyType",
    header: () => <div className="w-full text-center">Study Type</div>,
    cell: ({ row }) => {
      const studyType =
        row.getValue("studyType") === 0 ? "Full-Time" : "Part-Time";

      return <div className="text-center">{studyType}</div>;
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length == 0 || filterStatuses == "None") {
        return true;
      }
      const value = filterStatuses;
      const studyType = String(row.getValue("studyType"));
      return studyType == value;
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("grade")}</div>
    ),
  },
  {
    accessorKey: "_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {(row.getValue("_count") as any).userWithGroup}
        </div>
      );
    },
  },
  {
    accessorKey: "fileId",
    header: () => <div className="text-center">File</div>,
    cell: ({ row }) => {
      const fileId: Pick<FullGroupType, "fileId"> = row.getValue("fileId");

      return (
        <div className="text-right">
          {fileId ? (
            <Button className="w-full bg-white text-black hover:bg-gray-300">
              <Link href={`/api/download?file_id=${fileId}`} target="_blank">
                Download
              </Link>
            </Button>
          ) : (
            <div className="w-full text-center">No file</div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: GroupCellActions,
  },
];

export default columns;
