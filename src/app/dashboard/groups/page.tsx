"use client";

import { useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import Statistic from "../../../components/Statistic";

import ClipLoader from "react-spinners/ClipLoader";
import ErrorBlock from "./components/ErrorBlock";
import GroupTable from "./components/GroupTable";

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
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader size={100} color="#ffffff" />
      </div>
    );
  }

  if (groups === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ErrorBlock onRefetch={fetchGroups} />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10">
      <Statistic statisticList={statistic} />
      <GroupTable groups={groups} />
    </div>
  );
};

export default GroupsPage;
