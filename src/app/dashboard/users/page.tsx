"use client";

import { TelegramUser } from "@prisma/client";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<TelegramUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetch("/api/users").then((res) => res.json());
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return <div>page</div>;
};

export default UsersPage;
