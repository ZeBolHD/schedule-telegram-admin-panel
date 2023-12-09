"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
	const handleSignOut = () => {
		signOut();
	};

	return (
		<div>
			<h1 className="text-3xl text-white">Dashboard</h1>
			<button
				type="button"
				className="p-2 bg-red-500 text-white mt-5 rounded-md"
				onClick={handleSignOut}
			>
				Logout
			</button>
		</div>
	);
}
