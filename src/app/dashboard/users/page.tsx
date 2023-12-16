"use client";

import { useEffect, useState } from "react";

import getAllUsers from "@/actions/getAllUsers";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFetchBlock from "@/components/ErrorBlock";
import { FullTelegramUserType } from "@/types";

import UserTable from "./components/UserTable";
import UserStatistic from "./components/UserStatistic";

const UsersPage = () => {
  const [users, setUsers] = useState<FullTelegramUserType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingSpinner size={100} />;
  }

  if (users === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ErrorFetchBlock onRefetch={fetchUsers} />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10">
      <UserStatistic users={users} />
      <UserTable users={users} />
    </div>
  );
};

export default UsersPage;
