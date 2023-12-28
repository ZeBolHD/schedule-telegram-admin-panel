"use client";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import deleteGroup from "@/actions/deleteGroup";
import LoadingSpinner from "@/components/LoadingSpinner";
import { TableDataContext } from "@/context/TableGroupsDataContext";

interface GroupDeleteModal {
  id: number;
  code: string;
  onClose: () => void;
}

const GroupDeleteModal = ({ id, code, onClose }: GroupDeleteModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useContext(TableDataContext);

  const onGroupDelete = async () => {
    try {
      setIsLoading(true);
      await deleteGroup(id);

      onClose();
      setIsLoading(false);
      refetch();
      toast.success(`Group ${code} deleted successfully`);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <CardHeader>
        <h2> Delete Group</h2>
      </CardHeader>
      <CardContent>
        <p>Are you sure you want to delete group {code}?</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          className="ml-5"
          disabled={isLoading}
          onClick={onGroupDelete}
        >
          {isLoading ? <LoadingSpinner size={20} /> : "Delete"}
        </Button>
      </CardFooter>
    </div>
  );
};

export default GroupDeleteModal;
