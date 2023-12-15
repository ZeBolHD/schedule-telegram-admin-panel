"use client";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFetchBlock from "@/components/ErrorBlock";
import Statistic from "@/components/Statistic";

import GroupTable from "./components/GroupTable";
import GroupAdd from "./components/GroupAdd";

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
    return <LoadingSpinner />;
  }

  if (groups === null) {
    return <ErrorFetchBlock onRefetch={fetchGroups} />;
  }

  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-between">
        <Statistic statisticList={statistic} />

        <GroupAdd />
      </div>
      <GroupTable groups={groups} />
    </div>
  );
};

export default GroupsPage;
