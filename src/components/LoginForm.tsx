"use client";

import { SignInResponse, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const LoginForm = () => {
	const session = useSession();
	const router = useRouter();

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
		const login = e.currentTarget.login.value;
		const password = e.currentTarget.password.value;

		signIn("credentials", {
			username: login,
			password: password,
			redirect: false,
		})
			.then((callback) => {
				checkCredentials(callback!);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="w-[350px] p-[25px] box-content bg-white rounded-[10px] flex flex-col">
			<form onSubmit={handleSubmit}>
				<h2 className="text-[20px]">Welcome to admin panel</h2>
				<div className="mt-[20px]">
					<div className="w-full">
						<label htmlFor="login">Login</label>
						<input
							id="login"
							className="bg-slate-300 w-full mt-[10px] h-[40px] p-[10px] rounded-[10px] focus:border-red-500"
							type="text"
						/>
					</div>
				</div>
				<div className="mt-[20px] w-full">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						className="bg-slate-300 w-full h-[40px] mt-[10px] p-[10px] rounded-[10px]"
						type="password"
					/>
				</div>
				<div className="mt-[20px] w-full">
					<button
						type="submit"
						className="py-[8px] w-full bg-black text-white text-[16px] rounded-[10px] hover:bg-slate-800 transition duration-300"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};
