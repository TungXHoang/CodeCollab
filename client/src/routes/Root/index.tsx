export default function Root() {
  return (
		<div className="flex h-full justify-center items-center w-full bg-[#0e1525]">
			<div className="flex flex-col items-center justify-center margin-auto px-[50px]">
				<h2 className="text-white text-[32px] font-semibold">CodeCollab</h2>
				<img className="w-[160px] h-[160px] text-center" src={`${import.meta.env.VITE_APP_LOGO}`}/>
				<div className="text-center text-[15px] text-gray-400 mb-6">Real-time collaborative online coding platform.</div>
				<div className="flex gap-4">
					<a className="text-[13px] font-semibold flex items-center justify-center px-[16px] py-[12px] rounded-[6px] bg-blue-600 text-white hover:bg-blue-500" href="/app">
						Get Started
					</a>
					<a className="text-[13px] font-semibold flex items-center justify-center px-[16px] py-[12px] rounded-[6px] bg-gray-700 text-white hover:bg-gray-600" target="_blank" rel="noopener noreferrer" href="https://github.com/TungXHoang/CodeCollab">
						Github Repo
					</a>
				</div>
			</div>
		</div>
  );
};