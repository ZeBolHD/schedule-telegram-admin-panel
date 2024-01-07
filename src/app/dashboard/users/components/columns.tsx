import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { FullTelegramUserType } from "@/types";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<FullTelegramUserType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  { accessorKey: "username", header: "User Name" },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "userWithGroup",
    header: "Following Groups",
    cell: ({ row }) => {
      const userWithGroup = row.getValue(
        "userWithGroup"
      ) as FullTelegramUserType["userWithGroup"];
      const groupsString = userWithGroup
        .map((user) => user.group.code)
        .join(", ");
      return <div>{groupsString}</div>;
    },
  },
];

export default columns;
