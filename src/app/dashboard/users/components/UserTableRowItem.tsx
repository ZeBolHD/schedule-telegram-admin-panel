import TableCellItem from "@/components/Table/TableCellItem";
import TableRowItem from "@/components/Table/TableRowItem";
import { FullTelegramUserType } from "@/types";

interface UserTableRowItemProps {
  user: FullTelegramUserType;
}

const UserTableRowItem = ({ user }: UserTableRowItemProps) => {
  const followingGroups = user.userWithGroup
    .map((group) => group.group.code)
    .join(", ");

  return (
    <TableRowItem>
      <TableCellItem>{user.id}</TableCellItem>
      <TableCellItem>{user.first_name}</TableCellItem>
      <TableCellItem>{user.username}</TableCellItem>
      <TableCellItem>{new Date(user.createdAt).toString()}</TableCellItem>
      <TableCellItem>
        {followingGroups ? followingGroups : "None"}
      </TableCellItem>
    </TableRowItem>
  );
};

export default UserTableRowItem;
