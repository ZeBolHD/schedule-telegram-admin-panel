"use client";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";
import { useState } from "react";
import GroupModal from "./GroupModal";
import GroupTableItem from "./GroupTableItem";

interface TableProps {
  groups: FullGroupType[];
}

const Table = ({ groups }: TableProps) => {
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

  return (
    <>
      <section className="w-full mt-10 ">
        <table className="w-full justify-between border-collapse rounded">
          <thead>
            <tr className="text-lg border">
              <th className="w-10 border">Id</th>
              <th className="border">Code</th>
              <th className="border">Faculty</th>
              <th className="border">Study Type</th>
              <th className="border">Grade</th>
              <th className="border">Users</th>
              <th className="border">File</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {groups.map((group) => (
              <GroupTableItem
                group={group}
                key={group.id}
                openGroupEditModal={openGroupEditModal}
              />
            ))}
          </tbody>
        </table>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GroupModal group={selectedGroup!} onClose={closeGroupEditModal} />
      </Modal>
    </>
  );
};

export default Table;
