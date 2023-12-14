import TableCellItem from "@/components/Table/TableCellItem";
import TableRowItem from "@/components/Table/TableRowItem";
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
    <TableRowItem>
      <TableCellItem>{group.id}</TableCellItem>
      <TableCellItem>{group.code}</TableCellItem>
      <TableCellItem>{group.faculty.name}</TableCellItem>
      <TableCellItem>
        {group.studyType === 0 ? "Full Time" : "Part Time"}
      </TableCellItem>
      <TableCellItem>{group.grade}</TableCellItem>
      <TableCellItem>{group._count.userWithGroup}</TableCellItem>
      <TableCellItem>
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
      </TableCellItem>
      <TableCellItem>
        <button type="button" onClick={openModal}>
          Edit
        </button>
      </TableCellItem>
    </TableRowItem>
  );
};

export default GroupTableItem;
