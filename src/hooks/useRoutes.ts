import { BellRing, UserRound, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        label: "Users",
        href: "/dashboard/users",
        icon: UserRound,
        active: pathname === "/dashboard/users",
      },
      {
        label: "Groups",
        href: "/dashboard/groups",
        icon: Users,
        active: pathname === "/dashboard/groups",
      },
      {
        label: "Noficications",
        href: "/dashboard/notifications",
        icon: BellRing,
        active: pathname === "/dashboard/notifications",
      },
    ];
  }, [pathname]);

  return routes;
};

export default useRoutes;
