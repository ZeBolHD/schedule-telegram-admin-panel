import { useState } from "react";
import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { FullGroupType } from "@/types";
import deleteGroup from "@/actions/deleteGroup";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface GroupEditModalProps {
  fetchGroups: () => void;
  group: FullGroupType;
  onClose: () => void;
}

interface GroupEditFormInput {
  file: File;
}

const GroupEditModal = ({
  group,
  onClose,
  fetchGroups,
}: GroupEditModalProps) => {
  const [file, setFile] = useState<File>();

  const { register, handleSubmit } = useForm<GroupEditFormInput>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<GroupEditFormInput> = async (data) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("document", file, file.name);

    await axios.post("/api/schedule?groupId=" + group.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <h3 className="text-xl">Edit Group</h3>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <h3 className="text-lg">Code: {group.code}</h3>
        </div>
        <div className="mt-5 w-full">
          <Label htmlFor="file_input" className="text-lg font-normal">
            Upload file
          </Label>
          <Input
            {...register("file", { required: true })}
            className="cursor-pointer mt-2"
            id="file"
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
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          className=" hover:bg-red-600 hover:text-white"
          onClick={onGroupDelete}
        >
          Delete
        </Button>
        <Button
          type="submit"
          variant={"default"}
          className="ml-5 bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </CardFooter>
    </form>
  );
};

export default GroupEditModal;
