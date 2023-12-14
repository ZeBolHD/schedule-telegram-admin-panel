"use client";

import { useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import Statistic from "./components/Statistic";
import Table from "./components/Table";
import GroupModal from "./components/GroupModal";

import ClipLoader from "react-spinners/ClipLoader";
import ErrorBlock from "./components/ErrorBlock";

const GroupsPage = () => {
  const [groups, setGroups] = useState<FullGroupType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <Statistic groups={groups} />
      <Table groups={groups} />
    </div>
  );
};

export default GroupsPage;
