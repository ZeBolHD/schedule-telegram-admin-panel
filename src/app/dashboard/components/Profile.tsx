"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const session = useSession();
  const user = session.data?.user;
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleSignOut = () => {
    signOut();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
            {firstLetter}
          </div>
          <p className="ml-4">{user?.name}</p>
        </div>
        <Button
          variant={"destructive"}
          type="button"
          onClick={toggleModal}
          className="ml-10"
        >
          Logout
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CardHeader className="text-center">
          <h3 className="text-xl">Are you sure you want to logout?</h3>
        </CardHeader>
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            variant={"destructive"}
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </CardFooter>
      </Modal>
    </>
  );
};

export default Profile;
