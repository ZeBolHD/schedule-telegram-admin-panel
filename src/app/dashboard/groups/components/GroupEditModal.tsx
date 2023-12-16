import { useState } from "react";
import { toast } from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { FullGroupType } from "@/types";
import deleteGroup from "@/actions/deleteGroup";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GroupEditModalProps {
  fetchGroups: () => void;
  group: FullGroupType;
  onClose: () => void;
}

interface GroupEditFormInput {
  file: FileList | null;
  notification: number;
}

const GroupEditModal = ({
  group,
  onClose,
  fetchGroups,
}: GroupEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<GroupEditFormInput>();

  const onSubmit: SubmitHandler<GroupEditFormInput> = async (data) => {
    setIsLoading(true);

    const file = data.file?.[0];
    const notification = data.notification;

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("document", file, file.name);

    const url = `/api/schedule?groupId=${group.id}&notification=${notification}`;

    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setIsLoading(false);
    toast.success("Group schedule updated successfully");
    onClose();
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
          <Label htmlFor="file" className="text-lg font-normal">
            Upload file
          </Label>
          <Input
            className="cursor-pointer mt-2"
            type="file"
            id="file"
            accept=".pdf"
            {...register("file")}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PDF (MAX. 20MB).
          </p>
        </div>
        <div className="mt-5 flex items-center">
          <Controller
            control={control}
            name="notification"
            defaultValue={0}
            render={({ field }) => (
              <>
                <Checkbox
                  id="notification"
                  {...field}
                  checked={field.value === 1}
                  value={1}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                />
                <Label
                  htmlFor="notification"
                  className="text-md font-normal ml-2.5 cursor-pointer"
                >
                  Send with notification
                </Label>
              </>
            )}
          ></Controller>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          disabled={isLoading}
          className=" hover:bg-red-600 hover:text-white"
          onClick={onGroupDelete}
        >
          Delete
        </Button>
        <Button
          type="submit"
          variant={"default"}
          className="ml-5 bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size={20} /> : "Edit"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default GroupEditModal;
