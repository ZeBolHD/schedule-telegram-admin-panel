"use client";

import { useContext } from "react";
import { Faculty } from "@prisma/client";
import { toast } from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/Modal";

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
import { GroupCreateType } from "@/types";
import createGroup from "@/actions/createGroup";
import { TableGroupsDataContext } from "@/context/TableGroupsDataContext";
import useModal from "@/hooks/useModal";

interface GroupCreateProps {
  faculties: Faculty[];
}

const GroupCreate = ({ faculties }: GroupCreateProps) => {
  const { refetch } = useContext(TableGroupsDataContext);

  const { isModalOpen, toggleModal } = useModal();

  const { register, handleSubmit, control, reset } = useForm<GroupCreateType>();

  const onCloseModal = () => {
    toggleModal();
    reset();
  };

  const onSubmit: SubmitHandler<GroupCreateType> = async (data) => {
    const status = await createGroup(data);
    if (status === 200) {
      toggleModal();
      reset();
      refetch();
      toast.success("Group added successfully");
      return;
    }

    if (status === 409) {
      toast.error("Group already exists");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button
        type="button"
        className="px-5 py-5 bg-blue-500 text-white hover:bg-blue-600"
        onClick={toggleModal}
      >
        Create Group
      </Button>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
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
            <div className="w-full flex justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={onCloseModal}
                className="mr-5"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Add
              </Button>
            </div>
          </CardFooter>
        </form>
      </Modal>
    </>
  );
};

export default GroupCreate;
