import { IProject } from "../../types/project";
import DeletionAlertModal from "../DeletionAlertModal";
import { useState } from 'react';

interface ICheckboxModal {
	selectedProject: IProject[],
	onDelete: (selectedProject: string[]) => void
	isOwner: boolean
}

const CheckboxModal = ({ isOwner,selectedProject,onDelete }: ICheckboxModal) => {
	const [showDeletionAlert, setShowDeletionAlert] = useState(false);
	return (
		<>
			<div className="flex sticky z-10 bottom-[20px] justify-center items-center mt-auto pointer-events-none pt-[32px]">
				<div className="border-[2px] border-[rgba(255,255,255,0.1)] bg-[hsl(220,18%,10%)] text-[13px] font-[400] leading-[1.2] flex items-center px-[12px] py-[8px] gap-[8px] rounded-[6px] pointer-events-auto ">
					<span className="px-[10px] text-[hsl(0,0%,62%)]">
						{selectedProject.length} selected
					</span>
					<button disabled={!isOwner} onClick={isOwner?()=>setShowDeletionAlert(true):()=>{}}type="button" className="h-[32px] flex items-center px-[10px] gap-[6px] border-[1px] border-transparent hover:!border-[hsl(355,80%,65%)] rounded-[4px] bg-transparent text-[hsl(355,80%,65%)] disabled:border-none">
						<svg width="18px" height="18px" viewBox="0 0 24 24" fill="currentColor" >
							<path fillRule="evenodd" clipRule="evenodd" d="M10 2.75A1.25 1.25 0 0 0 8.75 4v1.25h6.5V4A1.25 1.25 0 0 0 14 2.75h-4Zm6.75 2.5V4A2.75 2.75 0 0 0 14 1.25h-4A2.75 2.75 0 0 0 7.25 4v1.25H3a.75.75 0 0 0 0 1.5h1.25V20A2.75 2.75 0 0 0 7 22.75h10A2.75 2.75 0 0 0 19.75 20V6.75H21a.75.75 0 0 0 0-1.5h-4.25Zm-11 1.5V20A1.25 1.25 0 0 0 7 21.25h10A1.25 1.25 0 0 0 18.25 20V6.75H5.75Zm4.25 3.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z"></path>
						</svg>
						<span className="text-[14px] pt-[1px] flex items-center flex-row justify-center overflow-hidden">Delete projects</span>
					</button>
				</div>
			</div>
			{
				showDeletionAlert && 
				<DeletionAlertModal projectsList={selectedProject} onDelete={onDelete} onClose={()=>setShowDeletionAlert(false)} />
			}
		</>
	)
}


export default CheckboxModal;