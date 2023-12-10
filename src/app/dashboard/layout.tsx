"use client";

import Header from "./components/Header";
import SideBar from "./components/SideBar";

interface DashBoardLayoutProps {
	children: React.ReactNode;
}

const layout = ({ children }: DashBoardLayoutProps) => {
	return (
		<div className="w-full h-full">
			<Header />
			<div className="w-full h-full flex">
				<SideBar />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default layout;
