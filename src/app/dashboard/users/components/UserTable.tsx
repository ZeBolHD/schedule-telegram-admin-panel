import { FullTelegramUserType } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <ScrollArea className="h-5/6 mt-10 rounded-md border  border-gray-500">
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
        <TableBody>
          {users.map((user) => (
            <UserTableRowItem key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default UserTable;
