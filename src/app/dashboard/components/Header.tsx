import Profile from "./Profile";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
	return (
		<header className="w-full h-16 border-b-2 border-white flex items-center p-10 justify-between">
			<div>
				<h1 className="text-2xl">Admin Panel</h1>
			</div>
			<div>
				<Profile />
			</div>
		</header>
	);
};

export default Header;
