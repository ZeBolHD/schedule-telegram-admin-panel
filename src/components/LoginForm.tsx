export const LoginForm = () => {
	return (
		<div className="w-[350px]  p-[25px] box-content bg-white rounded-[10px] flex flex-col">
			<form action="">
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
