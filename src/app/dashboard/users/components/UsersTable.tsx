import { TelegramUser } from "@prisma/client";

interface UsersTableProps {
  users: TelegramUser[];
}

const UsersTable = ({}: UsersTableProps) => {
  return <div>UsersTable</div>;
};

export default UsersTable;
