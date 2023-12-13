"use client";

import { signOut, useSession } from "next-auth/react";

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const session = useSession();
  const user = session.data?.user;
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
          {firstLetter}
        </div>
        <p className="ml-4">{user?.name}</p>
      </div>
      <button
        type="button"
        className="ml-10 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
