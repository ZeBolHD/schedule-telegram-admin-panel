"use client";

import { SignInResponse, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const checkCredentials = (callback: SignInResponse) => {
    if (!callback.error && callback.ok) {
      toast.success("Logged in");
      router.push("/dashboard");
    }

    if (callback.error) {
      toast.error("Wrong credentials");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    signIn("credentials", {
      ...credentials,
      redirect: false,
    })
      .then((callback) => {
        checkCredentials(callback!);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="w-96 p-8 box-content bg-white rounded-md flex flex-col text-black">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl">Welcome to admin panel</h2>
        <div className="mt-5 w-full">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            id="username"
            className="bg-slate-300 w-full mt-2 h-10 p-3 rounded-md focus:border-red-500"
            type="text"
          />
        </div>
        <div className="mt-5 w-full">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            className="bg-slate-300 w-full h-10 mt-2 p-3 rounded-md"
            type="password"
          />
        </div>
        <div className="mt-5 w-full">
          <button
            type="submit"
            className="py-2 w-full bg-black text-white text-lg rounded-md hover:bg-slate-800 transition duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
