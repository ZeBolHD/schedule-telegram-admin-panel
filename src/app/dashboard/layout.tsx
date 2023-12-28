"use client";

import { TableGroupsDataContextProvider } from "@/context/TableGroupsDataContext";

import Header from "./components/Header";
import SideBar from "./components/SideBar";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: DashBoardLayoutProps) => {
  return (
    <div className="w-full h-[calc(100vh-82px)]">
      <Header />
      <div className="w-full max-h-full h-full flex">
        <SideBar />
        <TableGroupsDataContextProvider>
          <main className="w-full max-h-full">{children}</main>
        </TableGroupsDataContextProvider>
      </div>
    </div>
  );
};

export default layout;
