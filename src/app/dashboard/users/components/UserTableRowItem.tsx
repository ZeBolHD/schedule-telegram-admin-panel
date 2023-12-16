import { TableCell, TableRow } from "@/components/ui/table";
import { FullTelegramUserType } from "@/types";

interface UserTableRowItemProps {
  user: FullTelegramUserType;
}

const UserTableRowItem = ({ user }: UserTableRowItemProps) => {
  const followingGroups = user.userWithGroup
    .map((group) => group.group.code)
    .join(", ");

  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{new Date(user.createdAt).toString()}</TableCell>
      <TableCell>{followingGroups ? followingGroups : "None"}</TableCell>
    </TableRow>
  );
};

export default UserTableRowItem;
