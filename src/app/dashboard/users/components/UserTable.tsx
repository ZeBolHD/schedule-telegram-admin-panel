import Table from "@/components/Table";
import TableRowItem from "@/components/Table/TableRowItem";

import { FullTelegramUserType } from "@/types";

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
    <Table labels={tableLabels}>
      {users.map((user) => (
        <UserTableRowItem key={user.id} user={user} />
      ))}
    </Table>
  );
};

export default UserTable;
