"use client";

import { useEffect, useState } from "react";

import { FullGroupType } from "@/types";
import getAllGroups from "@/actions/getAllGroups";

import Statistic from "./components/Statistic";
import Table from "./components/Table";
import GroupModal from "./components/GroupModal";

const GroupsPage = () => {
  const [groups, setGroups] = useState<FullGroupType[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getAllGroups();
      setGroups(groups);
    };

    fetchGroups();
  }, []);

  return (
    <div className="w-full h-full p-10">
      <Statistic groups={groups} />
      <Table groups={groups} />
    </div>
  );
};

export default GroupsPage;
