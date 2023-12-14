"use client";

import getAllUsers from "@/actions/getAllUsers";
import { TelegramUser } from "@prisma/client";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<TelegramUser[] | null>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return <div>page</div>;
};

export default UsersPage;
