import { createContext, useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

interface TableDataContextProps {
  groups: FullGroupType[] | null;
  isLoading: boolean;
  refetch: () => void;
}

const initialState: TableDataContextProps = {
  groups: null,
  isLoading: true,
  refetch: () => {},
};

const TableDataContext = createContext<TableDataContextProps>(initialState);

const TableDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [groups, setGroups] = useState<FullGroupType[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetch = async () => {
    setIsLoading(true);
    const groups = await getAllGroups();
    setIsLoading(false);
    setGroups(groups);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <TableDataContext.Provider value={{ groups, isLoading, refetch }}>
      {children}
    </TableDataContext.Provider>
  );
};

export { TableDataContext, TableDataContextProvider };
