"use client";

import { useState } from "react";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <ScrollArea className="h-5/6 mt-10 rounded-md border">
        <Table className="border-collapse text-md">
          <TableHeader>
            <TableRow>
              {tableLabels.map((label) => (
                <TableHead key={label} className="text-white">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <GroupTableItem
                key={group.id}
                group={group}
                openGroupEditModal={openGroupEditModal}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
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
