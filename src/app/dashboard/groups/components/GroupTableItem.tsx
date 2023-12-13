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
    <tr className="">
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
        <button type="button" onClick={openModal}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default GroupTableItem;
