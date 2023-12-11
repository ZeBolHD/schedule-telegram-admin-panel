import { FullGroupType } from "@/types";

interface TableProps {
  groups: FullGroupType[];
}

const Table = ({ groups }: TableProps) => {
  return (
    <section className="w-full mt-10 ">
      <table className="w-full justify-between border-collapse rounded">
        <thead>
          <tr className="text-lg border">
            <th className="w-10 border">Id</th>
            <th className="border">Code</th>
            <th className="border">Faculty</th>
            <th className="border">Study Type</th>
            <th className="border">Grade</th>
            <th className="border">File</th>
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
              <td className="border p-3">
                {group.fileId ? "Download" : "No file"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
