"use client";

import { useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFetchBlock from "@/components/ErrorBlock";
import Statistic from "@/components/Statistic";

import GroupTable from "./components/GroupTable";
import GroupCreate from "./components/GroupCreate";

const GroupsPage = () => {
  const [groups, setGroups] = useState<FullGroupType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const statistic = [
    {
      label: "Groups",
      data: groups?.length || 0,
    },
  ];

  const fetchGroups = async () => {
    setIsLoading(true);
    setGroups(null);
    const groups = await getAllGroups();
    setGroups(groups);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (isLoading) {
    return <LoadingSpinner size={100} />;
  }

  if (groups === null) {
    return <ErrorFetchBlock onRefetch={fetchGroups} />;
  }

  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-between">
        <Statistic statisticList={statistic} />

        <GroupCreate fetchGroups={fetchGroups} />
      </div>
      <GroupTable groups={groups} fetchGroups={fetchGroups} />
    </div>
  );
};

export default GroupsPage;
