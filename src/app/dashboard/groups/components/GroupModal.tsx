import { useState } from "react";

import { FullGroupType } from "@/types";

interface GroupModalProps {
  group: FullGroupType;
  onClose: () => void;
}

const GroupModal = ({ group, onClose }: GroupModalProps) => {
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

    // fetch("/api/groups/edit", {
    //   method: "PUT",
    //   body: file,
    //   headers: {
    //     "content-type": file.type,
    //     "content-length": `${file.size}`,
    //   },
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl">Edit Group</h2>
      <div className="mt-5 w-full">
        {/* <label className="text-lg" htmlFor="code">
            Code
          </label>
          <input
            id="code"
            value={group.code}
            className="bg-slate-300 w-full mt-2 h-10 p-3 rounded-md focus:border-red-500"
            type="text"
          /> */}
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
    </form>
  );
};

export default GroupModal;
