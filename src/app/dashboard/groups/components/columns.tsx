import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Faculty } from "@prisma/client";

import { FullGroupType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";

import GroupEditModal from "./GroupEditModal";
import GroupDeleteModal from "./GroupDeleteModal";
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faculty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">
        {(row.getValue("faculty") as Faculty).name}
      </div>
    ),
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
