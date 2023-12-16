"use client";

import { useEffect, useState } from "react";
import { Faculty } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/Modal";
import getAllFaculties from "@/actions/getAllFaculties";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface GroupAddProps {
  fetchGroups: () => void;
}

interface GroupAddFormInput {
  code: string;
  grade: string;
  facultyId: string;
  studyType: string;
}

const GroupAdd = ({ fetchGroups }: GroupAddProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[] | null>([]);

  const { register, handleSubmit, control, reset } =
    useForm<GroupAddFormInput>();

  const fetchFaculties = async () => {
    const faculties = await getAllFaculties();
    setFaculties(faculties);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset();
  };

  const onSubmit: SubmitHandler<GroupAddFormInput> = async (data) => {
    try {
      const res = await axios.post("/api/groups/add", data);
      if (res.status === 200) {
        toggleModal();
        reset();
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
      <Button
        type="button"
        className="px-5 py-5 bg-blue-500 text-white hover:bg-blue-600"
        onClick={toggleModal}
      >
        Add Group
      </Button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <h3 className="text-lg">Add Group</h3>
          </CardHeader>
          <CardContent className="text-lg">
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                {...register("code", { required: true })}
                type="text"
                placeholder="Code"
                className="mt-2"
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="code">Faculty</Label>
              <Controller
                control={control}
                name="facultyId"
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue
                          placeholder="Select a faculty"
                          id="facultyId"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {faculties?.map((faculty) => (
                          <SelectItem
                            key={faculty.id}
                            value={faculty.id.toString()}
                          >
                            {faculty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="studyType">Study Type</Label>
              <Controller
                control={control}
                name="studyType"
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Study Type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Full Time</SelectItem>
                        <SelectItem value="1">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="grade" className="text-lg">
                Grade
              </Label>
              <Input
                {...register("grade", { required: true })}
                type="number"
                max={6}
                min={1}
                className="mt-2"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Add
            </Button>
          </CardFooter>
        </form>
      </Modal>
    </>
  );
};

export default GroupAdd;
