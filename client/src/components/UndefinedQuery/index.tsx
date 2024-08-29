const UndefinedQuery = ({ query }: { query: string }) => {
	return (
		<div className="w-full max-w-none flex flex-col items-center mx-auto mt-[20px] py-[75px] px-[160px] rounded-[3px] bg-[#1C2A3A]">
			<div className="mb-[24px] text-[14.5px] font-[600] leading-[1.2] text-center text-[#E0E6ED]">No Projects found</div>
			<p className="text-[13px] font-[400] leading-[1.2] w-full text-[hsl(0,0%,100%)]/[0.6] text-center">
				No Projects found with title, or description matching
				<span className="text-[#FFFFFF]">{" "}{query}</span>.
				<br />
				Please try another filter query
			</p>
		</div>
	)
} 


export default UndefinedQuery