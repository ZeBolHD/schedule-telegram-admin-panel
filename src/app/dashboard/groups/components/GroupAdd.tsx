"use client";

import { useEffect, useRef, useState } from "react";
import { Faculty } from "@prisma/client";
import { IoMdArrowDropdown } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import Modal from "@/components/Modal";
import getAllFaculties from "@/actions/getAllFaculties";

interface GroupAddProps {
  fetchGroups: () => void;
}

const GroupAdd = ({ fetchGroups }: GroupAddProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[] | null>([]);

  const codeRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const facultyRef = useRef<HTMLSelectElement>(null);
  const studyTypeRef = useRef<HTMLSelectElement>(null);

  const fetchFaculties = async () => {
    const faculties = await getAllFaculties();
    setFaculties(faculties);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = codeRef.current?.value;
    const grade = gradeRef.current?.value;
    const facultyId = facultyRef.current?.value;
    const studyType = studyTypeRef.current?.value;

    const data = {
      code,
      grade,
      facultyId,
      studyType,
    };

    try {
      const res = await axios.post("/api/groups/add", data);
      if (res.status === 200) {
        toggleModal();
        fetchGroups();
        toast.success("Group added successfully");
      }
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      if (status === 409) {
        toast.error("Group already exists");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

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
          <form className="mt-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="text-lg">
                Code
              </label>
              <input
                ref={codeRef}
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
                  ref={facultyRef}
                  name="faculty"
                  id="faculty"
                  className="bg-slate-300 w-full mt-2 p-2.5 rounded-md flex items-center appearance-none"
                >
                  {faculties?.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
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
                  ref={studyTypeRef}
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
                ref={gradeRef}
                name="grade"
                id="grade"
                type="number"
                max={6}
                min={1}
                className="bg-slate-300 w-full mt-2 p-2.5 rounded-md"
              />
            </div>
            <div className="mt-10">
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
