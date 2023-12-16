import { FullTelegramUserType } from "@/types";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import UserTableRowItem from "./UserTableRowItem";

interface UsersTableProps {
  users: FullTelegramUserType[];
}

const UserTable = ({ users }: UsersTableProps) => {
  const tableLabels = [
    "Id",
    "FirstName",
    "UserName",
    "CreatedAt",
    "Following groups",
  ];

  return (
    <ScrollArea className="h-5/6 mt-10 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableLabels.map((label) => (
              <TableHead key={label} className="text-white">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {users.map((user) => (
          <UserTableRowItem key={user.id} user={user} />
        ))}
      </Table>
    </ScrollArea>
  );
};

export default UserTable;
