import { Outlet, useOutletContext,useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// hooks and context 
import useCompiling from "../../hooks/useCompiling";
import useKeyPress from "../../hooks/useKeyPress.tsx";
import { useAuthContext } from "../../context/AuthContext"
import { useProjectContext } from "../../context/ProjectContext";
// Subcomponent
import EditingNavRightGroup from "./EditingNavRightGroup.tsx";
import ProjectInfo from "./ProjectInfo.tsx";


type ContextType = { outputDetails: string | null, processing: boolean, setCode: (code:string)=>void };


const EditingNavbar = () => {

	//Context consume
	const {user} = useAuthContext();
	const navigate = useNavigate();
	const {project,setProject} = useProjectContext();
	//State for handling compile

	const [code, setCode] = useState<string>("");
	const {outputDetails, processing, handleSubmission } = useCompiling({project:project, code:code});

	const deleteAndNavigate =  (projectsId: string[]) => {
		navigate("/app", { replace: true, state: { deleteId:projectsId }});
	};

	const enterPress = useKeyPress("Enter");
	const ctrlPress = useKeyPress("Control");

	useEffect(() => {
		if (enterPress && ctrlPress) {
			handleSubmission();
		}
	}, [ctrlPress, enterPress]);

	return (
		<>
			<nav className="nav-shadow grid grid-cols-[1fr_max-content_1fr] z-50 relative justify-between justify-center items-center h-[48px] px-[6px] pl-0 bg-[#0E1525]">
				{/* Header Left */}
				<div className="flex flex-row items-center ">
					<div className="flex-none h-full ">
						<a href="/app" className="group block text-[13px] h-full leading-[1.3] px-[12px] pr-[3px] relative ">
							<span className="p-[7px] flex items-center h-[full] leading-1 hover:bg-[#6ea7ff17] rounded-[6px] whitespace-nowrap">
								<img className="w-[28px] h-[28px] text-center" src={`${import.meta.env.VITE_APP_LOGO}`} alt="CodeCollab Logo" />
								<span className="overflow-hidden max-w-0 group-hover:max-w-[100px] transition-[max-width] duration-500 ease-in-out brightness-125 h-[28px] font-medium text-[#1389fd] mt-[1px] ml-[10px] flex items-center">Dashboard</span>
							</span>
						</a>
					</div>
					{/* Project title and info */}
					<ProjectInfo project={project} setProject={setProject} user={user} onDelete={deleteAndNavigate} />
				</div>
				
			
				{/* Header Center */}
				<div className="flex-grow flex justify-center items-center">
					<button disabled={processing} onClick={handleSubmission} className={`w-fit flex items-center justify-center rounded-[4px] h-[32px] p-2 text-[#BFFFCA] !px-[12px] ${!processing ? "bg-[#044A10] border-transparent hover:text-white hover:bg-[#009118]" : "!px-2 bg-[#2B3245] text-[#C2C8CC] hover:text-white hover:bg-[#3C445C]" }`}>
						{processing ?
							<div className="small-loader"></div>
						:
							<svg width="12px" height="12px" viewBox="0 0 24 24" fill="currentColor">
								<path clipRule="evenodd" fillRule="evenodd" d="M20.593 10.91a1.25 1.25 0 0 1 0 2.18l-14.48 8.145a1.25 1.25 0 0 1-1.863-1.09V3.855a1.25 1.25 0 0 1 1.863-1.09l14.48 8.146Z"></path>
							</svg>
						}
						<span className="text-[14px] font-medium pl-[8px]"> {processing ? "Compiling"  : "Run"} </span>
					</button>
				</div>

				{/* Header Right */}
				<EditingNavRightGroup project={project} user={user} />
				
			</nav>
			<Outlet context={{outputDetails, processing, setCode} satisfies ContextType} />
		</>
	)
}

export default React.memo(EditingNavbar);

export function useEditNavbar() {
  return useOutletContext<ContextType>();
}