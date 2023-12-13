"use client";

import Modal from "@/components/Modal";
import { FullGroupType } from "@/types";
import { useState } from "react";

interface TableProps {
  groups: FullGroupType[];
}

const Table = ({ groups }: TableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <th className="border"></th>
            </tr>
          </thead>
          <tbody className="text-right">
            {groups.map((group) => (
              <tr key={group.id} className="">
                <td className="border text-center p-3">{group.id}</td>
                <td className="border p-3">{group.code}</td>
                <td className="border p-3">{group.faculty.name}</td>
                <td className="border p-3">
                  {group.studyType === 0 ? "Full Time" : "Part Time"}
                </td>
                <td className="border p-3">{group.grade}</td>
                <td className="border p-3">{group.userWithGroup.length}</td>
                <td className="border p-3">
                  {group.fileId ? (
                    <a
                      href={`/api/groups/download?file_id=${group.fileId}`}
                      target="_blank"
                    >
                      Download
                    </a>
                  ) : (
                    "No file"
                  )}
                </td>
                <td className="border p-3">
                  <button type="button" onClick={() => setIsModalOpen(true)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        bla
      </Modal>
    </>
  );
};

export default Table;
