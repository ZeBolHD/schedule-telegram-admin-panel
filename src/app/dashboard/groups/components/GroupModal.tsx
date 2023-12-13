import { FullGroupType } from "@/types";
import { RxCross2 } from "react-icons/rx";

interface GroupModalProps {
  group: FullGroupType;
  onClose: () => void;
}

const GroupModal = ({ group, onClose }: GroupModalProps) => {
  return (
    <form className="absolute w-2/6 p-10 bg-white text-black rounded-md shadow shadow-gray-400 z-50">
      <button
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
    text-white text-xl bg-red-500 rounded-full"
        type="button"
        onClick={onClose}
      >
        <RxCross2 />
      </button>
      <div>
        <h2 className="text-xl">Edit Group</h2>
        <div className="mt-5 w-full">
          <label className="text-lg" htmlFor="code">
            Code
          </label>
          <input
            id="code"
            value={group.code}
            className="bg-slate-300 w-full mt-2 h-10 p-3 rounded-md focus:border-red-500"
            type="text"
          />
        </div>
        <div className="mt-5 w-full">
          <label className="block mb-2 text-xl" htmlFor="file_input">
            Upload file
          </label>
          <input
            className="w-full text-md  text-gray-900 border rounded-lg cursor-pointer 
             file:bg-slate-300 file:border-0 file:p-2 file:cursor-pointer bg-slate-300  focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
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
      </div>
    </form>
  );
};

export default GroupModal;
