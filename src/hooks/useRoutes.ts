import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { FaUserGroup, FaUser } from "react-icons/fa6";

const useRoutes = () => {
	const pathname = usePathname();

	const routes = useMemo(() => {
		return [
			{
				label: "Users",
				href: "/dashboard/users",
				icon: FaUser,
				active: pathname === "/dashboard/users",
			},
			{
				label: "Groups",
				href: "/dashboard/groups",
				icon: FaUserGroup,
				active: pathname === "/dashboard/groups",
			},
		];
	}, [pathname]);

	return routes;
};

export default useRoutes;
