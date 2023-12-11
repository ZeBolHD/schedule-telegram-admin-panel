import { TelegramUser } from "@prisma/client";

const getAllUsers = async () => {
  const users = (await fetch("/api/users").then((res) =>
    res.json()
  )) as TelegramUser[];
  return users;
};

export default getAllUsers;
