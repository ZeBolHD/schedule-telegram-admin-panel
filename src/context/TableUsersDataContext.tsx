import { createContext, useEffect, useState } from "react";

import { FullTelegramUserType } from "@/types";
import getAllUsers from "@/actions/getAllUsers";

interface TableUsersDataContextProps {
  users: FullTelegramUserType[] | null;
  isLoading: boolean;
  refetch: () => void;
}

const initialState: TableUsersDataContextProps = {
  users: null,
  isLoading: true,
  refetch: () => {},
};

const TableUsersDataContext =
  createContext<TableUsersDataContextProps>(initialState);

const TableUsersDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<FullTelegramUserType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refetch = async () => {
    setIsLoading(true);
    const users = await getAllUsers();
    setIsLoading(false);
    setUsers(users);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <TableUsersDataContext.Provider value={{ users, isLoading, refetch }}>
      {children}
    </TableUsersDataContext.Provider>
  );
};

export { TableUsersDataContext, TableUsersDataContextProvider };
