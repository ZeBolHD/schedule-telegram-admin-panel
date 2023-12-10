import Link from "next/link";
import Profile from "./Profile";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className="w-full border-b-2 box-border border-white flex items-center py-5 px-10 justify-between">
      <div>
        <h1 className="text-2xl">
          <Link href="/dashboard">Admin Panel</Link>
        </h1>
      </div>
      <div>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
