"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import Modal from "@/components/Modal";

const GroupAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        type="button"
        className="px-5 py-5 flex items-center bg-blue-500 rounded-md text-white"
        onClick={toggleModal}
      >
        Add Group
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div>
          <h3 className="text-xl">Add Group</h3>
          <form className="mt-5">
            <div>
              <label htmlFor="code" className="text-lg">
                Code
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="bg-slate-300 w-full mt-2 p-2.5 rounded-md"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="code" className="text-lg">
                Faculty
              </label>
              <div className="w-full relative">
                <select
                  name="faculty"
                  id="faculty"
                  className="bg-slate-300 w-full mt-2 p-2.5 rounded-md flex items-center appearance-none"
                >
                  <option value="1">
                    факультет информационных систем и технологий
                  </option>
                  <option value="2">Механический факультет</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 h-full flex items-center px-2.5">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="studyType" className="text-lg">
                Study Type
              </label>
              <div className="w-full relative">
                <select
                  name="studyType"
                  id="studyType"
                  className="bg-slate-300 w-full mt-2 p-2.5 rounded-md flex items-center appearance-none"
                >
                  <option value="0">Full time</option>
                  <option value="1">Part Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 h-full flex items-center px-2.5">
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="grade" className="text-lg">
                Grade
              </label>
              <input
                name="grade"
                id="grade"
                type="number"
                max={6}
                min={1}
                className="bg-slate-300 w-full mt-2 p-2.5 rounded-md"
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="py-2 w-full bg-blue-500 text-white text-lg rounded-md 
                hover:bg-blue-600 transition duration-300"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default GroupAdd;
