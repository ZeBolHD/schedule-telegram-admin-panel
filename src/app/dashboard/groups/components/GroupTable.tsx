"use client";

import { useState } from "react";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";
import Table from "@/components/Table";

import GroupEditModal from "./GroupEditModal";
import GroupTableItem from "./GroupTableItem";

interface TableProps {
  fetchGroups: () => void;
  groups: FullGroupType[];
}

const GroupTable = ({ groups, fetchGroups }: TableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<FullGroupType | null>(
    null
  );

  const openGroupEditModal = (group: FullGroupType) => {
    setIsModalOpen(true);
    setSelectedGroup(group);
  };

  const closeGroupEditModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };

  const tableLabels = [
    "Id",
    "Code",
    "Faculty",
    "Study Type",
    "Grade",
    "Users",
    "File",
  ];

  return (
    <>
      <Table labels={tableLabels}>
        {groups.map((group) => (
          <GroupTableItem
            group={group}
            key={group.id}
            openGroupEditModal={openGroupEditModal}
          />
        ))}
      </Table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GroupEditModal
          group={selectedGroup!}
          onClose={closeGroupEditModal}
          fetchGroups={fetchGroups}
        />
      </Modal>
    </>
  );
};

export default GroupTable;
