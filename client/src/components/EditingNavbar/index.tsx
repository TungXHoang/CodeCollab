import { Outlet} from 'react-router-dom';
import React, {useState,useRef } from 'react';
import { useAuthContext } from "../../context/AuthContext"
import { useProjectContext } from "../../context/ProjectContext";
import ShareModal from "../../components/ShareModal";
// sub-component
import ProfileDropdown from "../Navbar/ProfileDropdown"
import {showShareToast } from "../../foundation/utils/ToastMessage.tsx"

const EditingNavbar = () => {
	// React state
	const [showShareModal, setShowShareModal] = useState(false);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
    // Add your save functionality here
  };

	// ref 
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	//utility
	const user = useAuthContext();
	const project = useProjectContext();


	const handleToggleShareModal = (status: boolean) => {
		status ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
		setShowShareModal(status);
	}

	const handleToggleDropdown = () => {
		!showProfileDropdown ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
		setShowProfileDropdown(!showProfileDropdown)
	}

	return (
		<>
			<nav className="nav-shadow flex z-20 relative shrink-0 items-center h-[48px] px-[12px] pl-0 bg-[#0E1525]">
				{/* Header Left */}
				<div className="flex-none h-full">
					<a href="/app" className="group block text-[13px] h-full leading-[1.3] px-[12px] pr-[3px] relative ">
						<span className="p-[7px] flex items-center h-full leading-1 hover:bg-[#6ea7ff17] whitespace-nowrap">
							<svg height="28px" width="28px" fill="#1389fd" className='text-[#1389fd] text-[24px]' viewBox="0 0 122.88 79.12" xmlns="http://www.w3.org/2000/svg">
								<path fill="currentColor" fillRule="evenodd" d="M58.63,63.26l3.52-17.9l3.57,5.39c7.69-3.09,12.01-8.18,12.65-16.01c6.32,11.04,2.49,20.95-5.53,26.74l3.64,5.48 L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26z M71.71,10.39 c-5.2-2.49-11.02-3.45-16.69-2.9c-5.63,0.54-11.1,2.59-15.62,6.1c-5.23,4.05-9.2,10.11-10.73,18.14l-0.48,2.51l-2.5,0.44 c-2.45,0.43-4.64,1.02-6.56,1.77c-1.86,0.72-3.52,1.61-4.97,2.66c-1.16,0.84-2.16,1.78-3.01,2.8c-2.63,3.15-3.85,7.1-3.82,11.1 c0.03,4.06,1.35,8.16,3.79,11.53c0.91,1.25,1.96,2.4,3.16,3.4c1.22,1.01,2.59,1.85,4.13,2.48c1.53,0.63,3.22,1.08,5.09,1.34h72.55 c3.53-0.85,6.65-2,9.3-3.48c2.63-1.47,4.78-3.26,6.39-5.41c2.5-3.33,3.73-8.04,3.78-12.87c0.06-5.07-1.18-10.16-3.59-13.86 c-0.69-1.07-1.45-2.03-2.25-2.89c-3.61-3.89-8.19-5.59-12.95-5.62c-2.49-0.02-5.06,0.41-7.57,1.22 C83.97,21.62,80.22,14.48,71.71,10.39L71.71,10.39z M91.99,20.65c1.6-0.25,3.2-0.38,4.79-0.36c6.72,0.05,13.2,2.45,18.3,7.95 c1.07,1.15,2.08,2.45,3.03,3.9c3.2,4.92,4.84,11.49,4.77,17.92c-0.07,6.31-1.77,12.59-5.25,17.21c-2.27,3.01-5.18,5.47-8.67,7.42 c-3.36,1.88-7.28,3.31-11.68,4.33l-0.82,0.1H23.38l-0.46-0.04c-2.67-0.34-5.09-0.97-7.29-1.88c-2.27-0.94-4.28-2.15-6.05-3.63 c-1.68-1.4-3.15-2.99-4.4-4.72C1.84,64.25,0.04,58.63,0,53.03c-0.04-5.66,1.72-11.29,5.52-15.85c1.23-1.48,2.68-2.84,4.34-4.04 c1.93-1.4,4.14-2.58,6.64-3.55c1.72-0.67,3.56-1.23,5.5-1.68c2.2-8.74,6.89-15.47,12.92-20.14c5.64-4.37,12.43-6.92,19.42-7.59 c6.96-0.67,14.12,0.51,20.55,3.6C81.9,7.15,88.02,12.76,91.99,20.65L91.99,20.65L91.99,20.65L91.99,20.65z M64.07,24.26l-3.52,17.9 l-3.57-5.39c-7.69,3.09-12.01,8.18-12.65,16.01c-6.32-11.04-2.49-20.95,5.53-26.74l-3.64-5.48L64.07,24.26L64.07,24.26L64.07,24.26 L64.07,24.26L64.07,24.26L64.07,24.26L64.07,24.26z"></path>
							</svg>
							<span className="overflow-hidden max-w-0 group-hover:max-w-[100px] transition-[max-width] duration-500 ease-in-out brightness-125 h-[28px] font-medium text-[#1389fd] mt-[1px] ml-[10px] flex items-center">Dashboard</span>
						</span>
					</a>
				</div>
				{/* Project title and info */}
				<div className="transition-all duration-300 ease-in-out flex  grow-1 gap-[4px] items-center">
					<div className="w-fit flex flex-row items-center text-[14px] font-[400] h-full text-[hsl(0,0%,80%)] ">
							<button className="border-[1px] border-[#0000] hover:bg-[hsl(220,60%,95%)]/[0.1] hover:border-[hsl(220,60%,95%)]/[0.15] transition-all duration-200 ease-in-out rounded-[6px] h-full py-[4px] px-[6px]">
								{project.title}
							</button>
						</div>
				</div>
			
				{/* Header Center */}
				<div className="flex flex-auto items-center justify-center w-[600px]">
					<div>
						<button className="hover:text-white hover:bg-[#009118] w-[68px] flex items-center justify-center rounded-[4px] text-[#BFFFCA] bg-[#044A10] border-transparent h-[32px]">
							<svg width="12px" height="12px" viewBox="0 0 24 24" fill="currentColor">
								<path clipRule="evenodd" fillRule="evenodd" d="M20.593 10.91a1.25 1.25 0 0 1 0 2.18l-14.48 8.145a1.25 1.25 0 0 1-1.863-1.09V3.855a1.25 1.25 0 0 1 1.863-1.09l14.48 8.146Z"></path>
							</svg>
							<span className="pl-[6px]"> Run </span>
						</button>
					</div>
				</div>

				{/* Header Right */}
				<div className="flex items-center ml-auto gap-[8px]">
					<button onClick={handleClick} className=" transition-all duration-200 ease-in-out text-white bg-[#1C2333] font-[400] items-center rounded-[6px] border-[1px] border-[#0000] flex gap-[8px] h-[32px] px-[10px] text-[13px] hover:border-[hsl(220,60%,95%)]/[0.14] hover:bg-[hsl(220,60%,95%)]/[0.1]">
						<span className="flex color-inherit items-center  justify-center h-fit w-fit">
							{
								isSpinning ?
								<svg aria-hidden="true" className="w-5 h-5 mr-[2px] animate-spin-fast dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
									<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
								</svg>
								:
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" width="16px" height="16px">
									<path d="M32 480H0V32h336l112 112v336H32m384-32V157.3L322.7 64H320v128H64V64H32v384zM96 64v96h192V64zm80 256a48 48 0 1 0 96 0 48 48 0 1 0-96 0m48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160"></path>
								</svg>
							}
						
						</span>
						<span className="flex items-center flex-row justify-center overflow-hidden px-[2px]">Save</span>
					</button>
					<div className="group h-full relative">
						<button disabled={project.owner._id !== user._id} onClick={() => handleToggleShareModal(true)} className={`transition-all duration-200 ease-in-out text-white bg-[#1C2333] font-[400] items-center rounded-[6px] border-[1px] border-[#0000] flex gap-[8px] h-[32px] px-[10px] text-[13px] ${project.owner._id === user._id ? 'hover:border-[hsl(220,60%,95%)]/[0.14] hover:bg-[hsl(220,60%,95%)]/[0.1]' : ''} `}>
							<svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor" >
								<path fillRule="evenodd" clipRule="evenodd" d="M8.5 3.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM3.75 7a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0ZM20 7.25a.75.75 0 0 1 .75.75v2.25H23a.75.75 0 0 1 0 1.5h-2.25V14a.75.75 0 0 1-1.5 0v-2.25H17a.75.75 0 0 1 0-1.5h2.25V8a.75.75 0 0 1 .75-.75ZM1.641 15.641A4.75 4.75 0 0 1 5 14.25h7A4.75 4.75 0 0 1 16.75 19v2a.75.75 0 0 1-1.5 0v-2A3.25 3.25 0 0 0 12 15.75H5A3.25 3.25 0 0 0 1.75 19v2a.75.75 0 0 1-1.5 0v-2c0-1.26.5-2.468 1.391-3.359Z"></path>
							</svg>
							<span className="text-[14px] flex items-center flex-row justify-center overflow-hidden">Invite</span>
						</button>
						{project.owner._id !== user._id  && (
							<div className="w-[130px] absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-[10px] px-2 z-10">
								Only for project owner
						</div>
						)}
					</div>


					
					<div className="ml-[5px]"> 
						<button ref={toggleButtonRef} onClick={handleToggleDropdown} className="ml-3 flex items-center gap-[3px] p-[6px] px-[8px] hover:bg-[#1C2333] rounded-[4px]"> 
							<div className="w-[21px] h-[21px] hover:border-[hsl(220,10%,16.5%)] focus-visible:border-[hsl(220,10%,16.5%)] rounded-full">
								<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
							</div>
							<svg width="12px" height="12px" viewBox="0 0 24 24" fill="#9DA2A6">
								<path fillRule="evenodd" clipRule="evenodd" d="M12.53 15.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06L12 13.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z"></path>
							</svg>
							{/* Profile dropdown */}
							{showProfileDropdown &&
								<ProfileDropdown user={user} toggleButtonRef={toggleButtonRef} isShow={showProfileDropdown} onClose={()=>setShowProfileDropdown(false)} />
							}
						</button>
					</div>

				</div>
				
			</nav>
			{showShareModal && <ShareModal onDeleteGuest={()=>showShareToast(200, "Delete guest successfully", { containerId: "EditingToast" }) } onShare={()=>{return}} toastContainerId={"EditingToast"} project={project} onClose={() => handleToggleShareModal(false)} />}
			<Outlet />
		</>
	)
}

export default React.memo(EditingNavbar);