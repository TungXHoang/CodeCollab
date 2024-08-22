import { useNavigate, Outlet, } from 'react-router-dom';
import React, {useState,useRef} from 'react';
import { LogoutAPI } from "../authAPI";
import {useAuthContext} from "../../context/AuthContext"
import useClickOutside from "../../hooks/useClickOutside"


const Navbar = () => {
	const [showModal, setShowModal] = useState(false)
	const [showDropdown, setShowDropdown] = useState(false);
	const user = useAuthContext();
	const navigate = useNavigate();
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	const handleLogout = async () => {
		await LogoutAPI();
		return navigate("/", { replace: true });
	};

	useClickOutside({
		isOpen: showDropdown, targetRef: popoverRef, toggleButtonRef: toggleButtonRef,
		onClickOutside: () => {
			setShowDropdown(false)
		}
	});
	
	const handleToggleDropdown = () => {
		if (!showDropdown) {
			document.body.style.overflow = 'hidden';
		}
		else {
			document.body.style.overflow = 'unset';
		}
		setShowDropdown(!showDropdown)
	}

	return (
		<>
			<header className="nav-shadow flex z-20 relative shrink-0 items-center h-[44px] px-[12px] bg-[hsl(220,10%,20%)]">
				{/* Header Left */}
				<a href="/app" onClick={() => navigate("/app")} className="p-[4px] ml-[10px] flex flex-row items-center">
					<span className="flex items-center justify-center align-center">
						<svg height="28px" width="28px" className='text-[#1389fd]' viewBox="0 0 122.88 79.12" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" fillRule="evenodd" d="M58.63,63.26l3.52-17.9l3.57,5.39c7.69-3.09,12.01-8.18,12.65-16.01c6.32,11.04,2.49,20.95-5.53,26.74l3.64,5.48 L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26z M71.71,10.39 c-5.2-2.49-11.02-3.45-16.69-2.9c-5.63,0.54-11.1,2.59-15.62,6.1c-5.23,4.05-9.2,10.11-10.73,18.14l-0.48,2.51l-2.5,0.44 c-2.45,0.43-4.64,1.02-6.56,1.77c-1.86,0.72-3.52,1.61-4.97,2.66c-1.16,0.84-2.16,1.78-3.01,2.8c-2.63,3.15-3.85,7.1-3.82,11.1 c0.03,4.06,1.35,8.16,3.79,11.53c0.91,1.25,1.96,2.4,3.16,3.4c1.22,1.01,2.59,1.85,4.13,2.48c1.53,0.63,3.22,1.08,5.09,1.34h72.55 c3.53-0.85,6.65-2,9.3-3.48c2.63-1.47,4.78-3.26,6.39-5.41c2.5-3.33,3.73-8.04,3.78-12.87c0.06-5.07-1.18-10.16-3.59-13.86 c-0.69-1.07-1.45-2.03-2.25-2.89c-3.61-3.89-8.19-5.59-12.95-5.62c-2.49-0.02-5.06,0.41-7.57,1.22 C83.97,21.62,80.22,14.48,71.71,10.39L71.71,10.39z M91.99,20.65c1.6-0.25,3.2-0.38,4.79-0.36c6.72,0.05,13.2,2.45,18.3,7.95 c1.07,1.15,2.08,2.45,3.03,3.9c3.2,4.92,4.84,11.49,4.77,17.92c-0.07,6.31-1.77,12.59-5.25,17.21c-2.27,3.01-5.18,5.47-8.67,7.42 c-3.36,1.88-7.28,3.31-11.68,4.33l-0.82,0.1H23.38l-0.46-0.04c-2.67-0.34-5.09-0.97-7.29-1.88c-2.27-0.94-4.28-2.15-6.05-3.63 c-1.68-1.4-3.15-2.99-4.4-4.72C1.84,64.25,0.04,58.63,0,53.03c-0.04-5.66,1.72-11.29,5.52-15.85c1.23-1.48,2.68-2.84,4.34-4.04 c1.93-1.4,4.14-2.58,6.64-3.55c1.72-0.67,3.56-1.23,5.5-1.68c2.2-8.74,6.89-15.47,12.92-20.14c5.64-4.37,12.43-6.92,19.42-7.59 c6.96-0.67,14.12,0.51,20.55,3.6C81.9,7.15,88.02,12.76,91.99,20.65L91.99,20.65L91.99,20.65L91.99,20.65z M64.07,24.26l-3.52,17.9 l-3.57-5.39c-7.69,3.09-12.01,8.18-12.65,16.01c-6.32-11.04-2.49-20.95,5.53-26.74l-3.64-5.48L64.07,24.26L64.07,24.26L64.07,24.26 L64.07,24.26L64.07,24.26L64.07,24.26L64.07,24.26z"></path>
						</svg>
					</span>
					<div className="ml-[8px] text-[hsl(0,0%,85%)] text-[18px] font-medium">CodeCollab</div>
				</a>
				<form className="flex relative w-64 mx-4 font-normal">
					<span className="block relative w-full h-[32px]">
						<svg className="absolute text-[hsl(0,0%,62%)] text-[16px] top-[calc(50%-.5em)] left-[10px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16px" height="16px">
							<path d="M6.5 2a4.5 4.5 0 0 1 3.52 7.3l3.97 3.99-.7.7-3.98-3.97A4.5 4.5 0 1 1 6.5 2m0 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
						</svg>
						<input className="w-full text-[14px] outline-none focus:border-[hsl(205,100%,50%)] focus:!bg-[hsl(0,0%,0%)]/[0.15] text-[hsl(0,0%,94%)] hover:border-[hsl(220,10%,45%)] block h-[32px] py-[4px] pl-[30px] pr-[8px] border-[1px] border-[hsl(220,60%,95%)]/[0.1] bg-transparent rounded-[3px] text-ellipsis" type="search" autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder="Search projects..." />
					</span>
				</form>
				{/* Header Right */}
				<div className="flex items-center ml-auto">
					<button onClick={() => setShowModal(true)} className="text-[hsl(191,91%,69%)] flex items-center mx-[4px] p-[8px] border-[1px] border-transparent rounded-[3px] select-none hover:bg-[hsl(220,10%,16.5%)] hover:border-[hsl(220,60%,95%)]/[0.1]">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12px" height="12px" fill="currentColor">
							<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
						</svg>
						<span className="ml-1">New Project</span>
					</button>
					<div className=""> 
						<button ref={toggleButtonRef} onClick={handleToggleDropdown} className="w-[35px] height-[35px]  border-[5px] border-transparent hover:border-[hsl(220,10%,16.5%)] focus-visible:border-[hsl(220,10%,16.5%)] rounded-full">
							<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
						</button>
						{/* Profile dropdown */}
						{showDropdown &&
							<div ref={popoverRef} className="dropdown-shadow z-10 absolute top-[38px] right-[10px] w-[230px] bg-[hsl(222,10%,20%)]">
							<div className="flex flex-col items-center text-center px-[16px] pt-[20px] ">
								<img className="w-[60px] h-[60px] bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
								<h3 className="leading-[1.375] mt-[10px] mb-[2px] text-[hsl(0,0%,94%)] text-[16px]">{user.firstName}{user.lastName}</h3>
							</div>
							<ul className="py-[8px] pt-0">
								<li className="block cursor-default py-[8px] before:block before:border-t-[1px] before:border-[hsl(0,0%,100%)]/[0.1]"></li>
								<li className="p-0 m-0"> 
									<a href="/app" className="popoverButton">
										<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
											<path fillRule="evenodd" clipRule="evenodd" d="m8.36 1.37 6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43z"></path>
										</svg>
										Your Dashboard
									</a> 
								</li>
								<li className="p-0 m-0"> 
									<a href="/app" className="popoverButton">
										<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
											<path fillRule="evenodd" clipRule="evenodd" d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A8 8 0 0 0 8.016 16a8 8 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.2 4.2 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.2 4.2 0 0 1 8 10.342a4.18 4.18 0 0 1 2.928 1.166q.552.552.864 1.295.168.432.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.5 2.5 0 0 1-.208-1.024c0-.351.064-.703.208-1.023s.336-.607.576-.847.528-.431.848-.575.672-.208 1.024-.208c.368 0 .704.064 1.024.208s.608.336.848.575c.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.8 2.8 0 0 1-.576.848 2.8 2.8 0 0 1-.848.575 2.72 2.72 0 0 1-2.064 0 2.8 2.8 0 0 1-.848-.575 2.5 2.5 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.2 5.2 0 0 0-.688-1.406 4.9 4.9 0 0 0-1.088-1.135 5.2 5.2 0 0 0-1.04-.608 3 3 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.6 3.6 0 0 0 .528-1.934 3.7 3.7 0 0 0-.288-1.47 3.8 3.8 0 0 0-.816-1.199 3.9 3.9 0 0 0-1.2-.8 3.7 3.7 0 0 0-1.472-.287 3.7 3.7 0 0 0-1.472.288 3.6 3.6 0 0 0-1.2.815 3.8 3.8 0 0 0-.8 1.199 3.7 3.7 0 0 0-.288 1.47q0 .528.144 1.007c.096.336.224.64.4.927.16.288.384.544.624.784q.216.216.48.383a5 5 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a5 5 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"></path>
										</svg>
										Your Profile
									</a> 
								</li>
								<li className="block cursor-default py-[8px] before:block before:border-t-[1px] before:border-[hsl(0,0%,100%)]/[0.1]"></li>
								<li className="p-0 m-0"> 
									<a onClick={handleLogout} className="popoverButton">
										<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
											<path fillRule="evenodd" clipRule="evenodd" d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984zM7 14.28l-4-1.34V3.72l4 1.34zm6.52-5.8H8.55v-1h4.93l-1.6-1.6.71-.7 2.47 2.46v.71l-2.49 2.48-.7-.7z"></path>
										</svg>
										Sign Out
									</a> 
								</li>
							</ul>
						</div>
						}
					</div>

				</div>
			</header>
			<Outlet context={[showModal, setShowModal]} />
		</>
	)
}

export default React.memo(Navbar);