import { IProject } from "../../types/project";
import { useState, useRef } from 'react';

import useClickOutside from "../../hooks/useClickOutside";
import { IAuthUser } from "../../types/auth"
import DeletionAlertModal from "../DeletionAlertModal"
import {updateProject} from "../../foundation/projectsAPI"


interface IProjectInfo {
	onDelete: (projectsId: string[]) => void;
	setProject: React.Dispatch<React.SetStateAction<IProject | undefined>>;
	project: IProject;
	user: IAuthUser 
}

const ProjectInfo = ({ setProject,project,user,onDelete }: IProjectInfo) => {
	const [showProjectInfo, setShowProjectInfo] = useState(false);
	const [showDeletionAlert, setShowDeletionAlert] = useState(false);
	const [projectTitle, setProjectTitle] = useState(project.title);
	const [projectDescription, setProjectDescription] = useState(project.description);

	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
	const popoverRef = useRef<HTMLDivElement | null>(null);


	useClickOutside({
		disable: showDeletionAlert, isOpen: showProjectInfo, targetRef: popoverRef, toggleButtonRef: toggleButtonRef,
		onClickOutside: () => {
			setShowProjectInfo(false);
		}
	});

	const handleUpdate = async ({ newTitle, newDescription }:{newTitle:string,newDescription:string}) => {
		const res = await updateProject({ userId:user._id, projectId: project._id, newTitle: newTitle, newDescription:newDescription })
		if (res) {
			setProject({
				...project,
				title: newTitle,
				description:newDescription,
			});
		}
		setShowProjectInfo(false);
	}

	return (
		<div className="relative transition-all duration-300 ease-in-out flex h-[32px] grow-1 gap-[4px] items-center">
			<div className="w-fit flex flex-row items-center text-[14px] font-[400] h-full text-[hsl(0,0%,80%)] ">
				<button ref={toggleButtonRef} onClick={()=>setShowProjectInfo(!showProjectInfo)} className="border-[1px] border-[#0000] hover:bg-[hsl(220,60%,95%)]/[0.1] hover:border-[hsl(220,60%,95%)]/[0.15] transition-all duration-200 ease-in-out rounded-[6px] h-full py-[4px] px-[6px]">
					{project.title}
				</button>
			</div>

			{/* Popover */}
			{showProjectInfo &&
				<div ref={popoverRef} className="absolute left-0 top-[calc(100%+5px)] w-[400px] flex flex-col bg-[#1C2333] dropdown-shadow rounded-[4px]">
					<div className="flex p-[8px] pt-[12px] items-center shrink-0">
						<a className="transition-[background-color] duration-150 ease-in-out text-[#F5F9FC] font-[400] cursor-pointer h-[32px] p-[8px] px-[10px] flex gap-[10px] justify-center items-center bg-[#2B3245] hover:bg-[#3C445C] rounded-[4px]">
							<div className="w-[21px] h-[21px] hover:border-[hsl(220,10%,16.5%)] focus-visible:border-[hsl(220,10%,16.5%)] rounded-full">
								<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src={project.owner.thumbnailUrl} alt="avatar"/>
							</div>
							<span className="text-[14px]">{project.owner.firstName}{project.owner.lastName}</span>
						</a>
						{project.owner._id === user._id &&
							<div className="ml-auto flex gap-[10px]">
								<button onClick={()=>setShowDeletionAlert(true)} disabled={project.owner._id !== user._id} className="transition-all duration-200 ease-in-out text-[#F5F9FC] bg-[#A60808] hover:bg-[#E52222] h-[32px] font-[400] items-center rounded-[4px] border-[1px] border-[#0000] flex gap-[6px] h-[32px] px-[8px] text-[13px]">
									<svg width="16px" height="16px" viewBox="0 0 24 24" fill="#F5F9FC" >
										<path fillRule="evenodd" clipRule="evenodd" d="M10 2.75A1.25 1.25 0 0 0 8.75 4v1.25h6.5V4A1.25 1.25 0 0 0 14 2.75h-4Zm6.75 2.5V4A2.75 2.75 0 0 0 14 1.25h-4A2.75 2.75 0 0 0 7.25 4v1.25H3a.75.75 0 0 0 0 1.5h1.25V20A2.75 2.75 0 0 0 7 22.75h10A2.75 2.75 0 0 0 19.75 20V6.75H21a.75.75 0 0 0 0-1.5h-4.25Zm-11 1.5V20A1.25 1.25 0 0 0 7 21.25h10A1.25 1.25 0 0 0 18.25 20V6.75H5.75Zm4.25 3.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z"></path>
									</svg>
									<span className="text-[14px] flex items-center flex-row justify-center overflow-hidden">Delete</span>
								</button>
							</div>
						}
						
					</div>
					<form onSubmit={(e) => e.preventDefault()} className="flex flex-col text-[13px] font-[400] gap-[20px] leading-[1.2] p-[16px]">
						<div className="flex flex-col gap-[4px]">	
							<label className="font-[600] text-[12px] text-[#C2C8CC]">Title</label>	
							<input disabled={project.owner._id !== user._id } onKeyDown={(e) => { if(e.key === 'Enter') e.preventDefault()}}  onChange={(e)=>setProjectTitle(e.target.value)} className="transition-[border-color] duration-150 ease-in-out text-[#F5F9FC] text-[13px] font-[400] w-full outline-none px-[7px] py-[7px] h-[30px] border-[#3C445C] border-[1px] rounded-[4px] bg-[#2B3245] hover:border-[#5F677A] focus:outline-[2px] focus:outline-[#0079F2] focus:border-none !outline-offset-[0px]" type="text" value={projectTitle} autoCorrect="off" spellCheck="false"></input>
						</div>
						<div className="flex flex-col gap-[4px]">	
							<label className="font-[600] pb-[8px] text-[12px] text-[#C2C8CC]">Description</label>
							<textarea disabled={project.owner._id !== user._id } onChange={(e)=>setProjectDescription(e.target.value)} className="transition-[border-color] duration-150 ease-in-out text-[#F5F9FC] text-[13px] font-[400] min-h-[96px] max-h-[150px] w-full outline-none px-[7px] py-[7px] border-[#3C445C] border-[1px] rounded-[4px] bg-[#2B3245] hover:border-[#5F677A] focus:outline-[2px] focus:outline-[#0079F2] focus:border-none !outline-offset-0" value={projectDescription} autoCorrect="off" spellCheck="false"></textarea>			
						</div>
						<div>
							<button disabled={project.owner._id !== user._id } onClick={()=>handleUpdate({newTitle:projectTitle,newDescription:projectDescription})}  className="text-[#F5F9FC] bg-[#0053A6] hover:bg-[#0079F2] h-[32px] p-[8px] w-full flex justify-center items-center gap-[8px] rounded-[4px] disabled:bg-[#004182] disabled:text-[#0079F2]">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" width="16px" height="16px">
									<path d="M32 480H0V32h336l112 112v336H32m384-32V157.3L322.7 64H320v128H64V64H32v384zM96 64v96h192V64zm80 256a48 48 0 1 0 96 0 48 48 0 1 0-96 0m48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160"></path>
								</svg>
								<span>Save Update</span>
							</button>
						</div>
					</form>
				</div>
			}
			{
				showDeletionAlert && 
				<DeletionAlertModal projectsList={[project]} onDelete={onDelete} onClose={()=>setShowDeletionAlert(false)} />
			}
			
		</div>
	)
}

export default ProjectInfo