"use client";

import { Faculty } from "@prisma/client";
import { ColumnFiltersState, Updater } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GroupFiltersProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  faculties: Faculty[];
}

const GroupFilters = ({ faculties, setColumnFilters }: GroupFiltersProps) => {
  const changeFacultyFilter = (facultyId: string) => {
    setColumnFilters((prev) => {
      if (prev.find((filter) => filter.id === "faculty")) {
        return [
          ...prev.filter((filter) => filter.id !== "faculty"),
          { id: "faculty", value: facultyId },
        ];
      }

      return [...prev, { id: "faculty", value: facultyId }];
    });
  };

  const changeStudyTypeFilter = (studyType: string) => {
    setColumnFilters((prev) => {
      if (prev.find((filter) => filter.id === "studyType")) {
        return [
          ...prev.filter((filter) => filter.id !== "studyType"),
          { id: "studyType", value: studyType },
        ];
      }

      return [...prev, { id: "studyType", value: studyType }];
    });
  };

  return (
    <div className=" text-black ml-0 mr-auto flex text-center">
      <div className="w-80">
        <Select onValueChange={changeFacultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select a faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Faculties</SelectLabel>
              <SelectItem value="None" className="cursor-pointer">
                None
              </SelectItem>
              {faculties.map((faculty) => (
                <SelectItem
                  key={faculty.id}
                  value={String(faculty.id)}
                  className="cursor-pointer"
                >
                  {faculty.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-60 ml-5">
        <Select onValueChange={changeStudyTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select a study type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Study Types</SelectLabel>
              <SelectItem value="None" className="cursor-pointer">
                None
              </SelectItem>
              <SelectItem value="0" className="cursor-pointer">
                Full-Time
              </SelectItem>
              <SelectItem value="1" className="cursor-pointer">
                Part-Time
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GroupFilters;
