import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { FullGroupType } from "@/types";

interface GroupTableItemProps {
  group: FullGroupType;
  openGroupEditModal: (group: FullGroupType) => void;
}

const GroupTableItem = ({ group, openGroupEditModal }: GroupTableItemProps) => {
  const openModal = () => {
    openGroupEditModal(group);
  };

  return (
    <TableRow>
      <TableCell>{group.id}</TableCell>
      <TableCell>{group.code}</TableCell>
      <TableCell>{group.faculty.name}</TableCell>
      <TableCell>{group.studyType === 0 ? "Full Time" : "Part Time"}</TableCell>
      <TableCell>{group.grade}</TableCell>
      <TableCell>{group._count.userWithGroup}</TableCell>
      <TableCell>
        {group.fileId ? (
          <Link href={`/api/download?file_id=${group.fileId}`} target="_blank">
            Download
          </Link>
        ) : (
          "No file"
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          type="button"
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default GroupTableItem;
