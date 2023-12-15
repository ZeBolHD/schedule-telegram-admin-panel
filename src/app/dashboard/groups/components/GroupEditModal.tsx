import { useState } from "react";
import { toast } from "react-hot-toast";

import { FullGroupType } from "@/types";
import deleteGroup from "@/actions/deleteGroup";

interface GroupEditModalProps {
  fetchGroups: () => void;
  group: FullGroupType;
  onClose: () => void;
}

const GroupEditModal = ({
  group,
  onClose,
  fetchGroups,
}: GroupEditModalProps) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }
  };

  const onGroupDelete = async () => {
    try {
      await deleteGroup(group.id);
      fetchGroups();
      onClose();
      toast.success(`Group ${group.code} deleted successfully`);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl">Edit Group</h2>
      <div className="mt-5 w-full">
        <h3 className="text-lg">Code: {group.code}</h3>
      </div>
      <div className="mt-5 w-full">
        <label className="block mb-2 text-lg" htmlFor="file_input">
          Upload file
        </label>
        <input
          className="w-full text-md  text-gray-900 border rounded-lg cursor-pointer 
             file:bg-slate-300 file:border-0 file:p-2 file:cursor-pointer bg-slate-300  focus:outline-none"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={handleFileChange}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PDF (MAX. 20MB).
        </p>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 mt-5 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        type="button"
        className="w-full px-4 py-2 mt-5 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600"
        onClick={onGroupDelete}
      >
        Delete
      </button>
    </form>
  );
};

export default GroupEditModal;
