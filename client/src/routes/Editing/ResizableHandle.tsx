import { useState,useEffect } from 'react';

const ResizableHandle = () => {
	const [isClicked, setIsClicked] = useState(false);

	useEffect( () => {
		document.addEventListener('mouseup', () => { setIsClicked(false)});
		return () => {
			document.removeEventListener('mouseup', () => { setIsClicked(false) });
		};
	})

	return (
		<div onMouseDown={() => setIsClicked(true)} className="relative flex group items-center justify-center w-[full] h-[100%]  to-transparent text-[#2B3245]">
			<div className={`left-[2px] absolute w-[2px] h-[98%] ${isClicked ? 'bg-[radial-gradient(circle,#0079F2_calc(70%),transparent)]':'bg-transparent'}`}> </div>
			{!isClicked && <div className="w-[2px] h-[24px] bg-[#2B3245] group-hover:bg-[#F5F9FC] rounded-[4px] "></div>}

		</div>
	)
}

export default ResizableHandle