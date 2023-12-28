"use client";

import { useContext, useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFetchBlock from "@/components/ErrorBlock";
import Statistic from "@/components/Statistic";
import { TableGroupsDataContext } from "@/context/TableGroupsDataContext";

import GroupTable from "./components/GroupTable";
import GroupCreate from "./components/GroupCreate";

const GroupsPage = () => {
  const { groups, isLoading, refetch } = useContext(TableGroupsDataContext);

  const statistic = [
    {
      label: "Groups",
      data: groups?.length || 0,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner size={100} />;
  }

  if (groups === null) {
    return <ErrorFetchBlock onRefetch={refetch} />;
  }

  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-between">
        <Statistic statisticList={statistic} />

        <GroupCreate />
      </div>
      <GroupTable groups={groups} />
    </div>
  );
};

export default GroupsPage;
