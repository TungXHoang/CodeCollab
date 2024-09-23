import { useNavigate, Outlet, } from 'react-router-dom';
import React, {useState,useRef} from 'react';
import { useAuthContext } from "../../context/AuthContext"
import { useUserProjectsContext } from "../../context/UserProjectsContext.tsx";

// sub-component
import { IProject } from "../../types/project";
import SearchField from "./SearchField";
import ProfileDropdown from "../ProfileDropdown"
import SelectionModal from "../../components/SelectionModal";


const Navbar = () => {
	// React state
	const [showModal, setShowModal] = useState(false)
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	// ref 
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	//utility
	const {user} = useAuthContext();
	const navigate = useNavigate();
	const { projectsList, handleCreate } = useUserProjectsContext();
 
	const handleToggleDropdown = () => {
		!showProfileDropdown ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
		setShowProfileDropdown(!showProfileDropdown)
	}

	return (
		<>
			<header className="border-b-[1px] border-b-[#2B3245] nav-shadow flex z-20 relative shrink-0 items-center h-[48px] px-[12px] bg-[#0E1525]">
				{/* Header Left */}
				<a href="/app" onClick={() => navigate("/app")} className="p-[4px] ml-[10px] flex flex-row items-center">
					<img className="w-[28px] h-[28px] text-center" src={`${import.meta.env.VITE_APP_LOGO}`} alt="CodeCollab Logo" />
					<div className="ml-[8px] text-[hsl(0,0%,85%)] text-[18px] font-medium">CodeCollab</div>
				</a>
				<SearchField projectsList={projectsList} />
				{/* Header Right */}
				<div className="flex items-center ml-auto">
					<button onClick={() => setShowModal(true)} className=" transition-all duration-200 ease-in-out text-white bg-[#1C2333] font-[400] items-center rounded-[6px] border-[1px] border-[#0000] flex gap-[5px] h-[32px] px-[10px] text-[13px] hover:border-[hsl(220,60%,95%)]/[0.14] hover:bg-[hsl(220,60%,95%)]/[0.1]">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12px" height="12px" fill="currentColor">
							<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
						</svg>
						<span className="">New Project</span>
					</button>
					<button ref={toggleButtonRef} onClick={handleToggleDropdown} className="ml-3 flex items-center gap-[3px] p-[6px] px-[8px] hover:bg-[#1C2333] rounded-[4px]"> 
						<div className="w-[21px] h-[21px] hover:border-[hsl(220,10%,16.5%)] focus-visible:border-[hsl(220,10%,16.5%)] rounded-full">
							<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src={user.thumbnailUrl} alt="avatar"/>
						</div>
						<svg width="12px" height="12px" viewBox="0 0 24 24" fill="#9DA2A6">
							<path fillRule="evenodd" clipRule="evenodd" d="M12.53 15.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06L12 13.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z"></path>
						</svg>
					</button>
					{showProfileDropdown && <ProfileDropdown user={user} toggleButtonRef={toggleButtonRef} isShow={showProfileDropdown} onClose={()=>setShowProfileDropdown(false)} />}
				</div>
			</header>
			{showModal &&
				<SelectionModal onSelect={setShowModal} onCreate={(newProject:IProject) => handleCreate(newProject)} />
			}
			<Outlet />
		</>
	)
}

export default React.memo(Navbar);