"use client";

import { useState } from "react";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";
import Table from "@/components/Table";

import GroupModal from "./GroupModal";
import GroupTableItem from "./GroupTableItem";

interface TableProps {
  groups: FullGroupType[];
}

const GroupTable = ({ groups }: TableProps) => {
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
        <GroupModal group={selectedGroup!} onClose={closeGroupEditModal} />
      </Modal>
    </>
  );
};

export default GroupTable;
