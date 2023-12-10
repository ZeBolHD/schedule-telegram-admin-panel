"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
	const handleSignOut = () => {
		signOut();
	};

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
