import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { FullTelegramUserType } from "@/types";
import { Button } from "@/components/ui/button";
import TableHeaderSortButton from "@/components/TableHeaderSortButton";

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
    header: ({ column }) => (
      <TableHeaderSortButton column={column} name="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const dateString = date.toLocaleDateString();

      return <div>{dateString}</div>;
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
