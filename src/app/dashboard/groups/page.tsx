"use client";

import { useContext, useState } from "react";
import { RowSelectionState, Updater } from "@tanstack/react-table";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFetchBlock from "@/components/ErrorBlock";
import { FullGroupType } from "@/types";

import { TableGroupsDataContext } from "@/context/TableGroupsDataContext";

import GroupTable from "./components/GroupTable";
import GroupCreate from "./components/GroupCreate";
import GroupAddSchedule from "./components/GroupAddSchedule";

const GroupsPage = () => {
  const { groups, isLoading, refetch } = useContext(TableGroupsDataContext);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const onRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    setRowSelection(updater);
  };

  const resetRowSelection = () => {
    setRowSelection({});
  };

  if (isLoading) {
    return <LoadingSpinner size={100} />;
  }

  if (groups === null) {
    return <ErrorFetchBlock onRefetch={refetch} />;
  }

  const getSelectedGroups = () => {
    const keys = Object.keys(rowSelection);

    return keys.map((key) => groups[Number(key)]);
  };

  const selectedGroups = getSelectedGroups();

  const isAnyGroupSelected = selectedGroups.length > 0;

  console.log(selectedGroups);

  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-end">
        {/* <Statistic statisticList={statistic} /> */}
        <GroupAddSchedule
          groups={selectedGroups}
          disabled={!isAnyGroupSelected}
          resetRowSelection={resetRowSelection}
        />
        <GroupCreate />
      </div>
      <GroupTable
        groups={groups}
        onRowSelectionChange={onRowSelectionChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default GroupsPage;
