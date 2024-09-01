import { IProject } from "../ProjectsList/IProject";
import {useState} from "react"
import { deleteProject } from "../../foundation/projectsAPI"

import { useAuthContext } from "../../context/AuthContext.tsx";
interface IDeletionAlertModal {
	onClose: () => void;
	onDelete: (projectsId: string[]) => void;
	projectsList: IProject[];
	
}
const DeletionAlertModal = ({ onClose, onDelete, projectsList }: IDeletionAlertModal) => {	
	
	const user = useAuthContext();
	const projectIdList: string[] = projectsList.map(projectIdList => projectIdList._id);
	const [isSpinning, setIsSpinning] = useState(false);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsSpinning(true);
		const res = await deleteProject({projectsId: projectIdList , userId: user._id})
		if (res) {
			setIsSpinning(false);
			onDelete(projectIdList)
		}
		return res;
	}

	return (
		<>
			<div className="cursor-auto top-0 right-0 bottom-0 right-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}>
				<div className="absolute left-0 right-0 top-[150px] w-full max-w-[480px] mx-auto" onClick={(e) => e.stopPropagation()}>
					<div className="dropdown-shadow flex flex-col text-left p-[16px] pb-[20px] bg-[#1C2333] rounded-[6px] text-[#F5F9FC]">
						<button onClick={onClose} className="absolute w-[24px] h-[24px] top-[8px] right-[8px] flex items-center justify-center rounded-[4px] transition-[background-color] ease-in-out duration-150 hover:bg-[#2B3245]">
							<svg width="16px" height="16px" fill="#F5F9FC" viewBox="0 0 24 24"> 
								<path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"></path>
							</svg>
						</button>
						<div className="flex flex-col gap-[16px]">
							<h2 className="text-[20px] leading-[1.4] font-[500]">Delete Project?</h2>
							<div className="text-[14px] leading-[1.6] text-[#C2C8CC] mt-1">
								Are you sure you want to delete
								<span className="text-[#F5F9FC] font-[500]">
								{" "}{projectsList.length > 1 ? `${projectsList.length} projects` : projectsList[0].title}?{" "}
								</span>
								This action cannot be undone.
							</div>
							<div className="flex flex-row gap-[12px] justify-end mt-[10px] items-center">
								<button onClick={onClose} className="bg-[#2B3245] hover:bg-[#3C445C] transition-[background-color] ease-in-out p-[8px] rounded-[4px] h-[32px] flex items-center">
									<span className="text-[14px] leading-[1.6]">Cancel</span>
								</button>
								<button onClick={handleDelete} className="bg-[#A60808] hover:bg-[#E52222] transition-[background-color] ease-in-out rounded-[4px] text-[#F5F9FC] h-[32px] flex items-center p-[8px] gap-[8px]">
									{
										isSpinning ?
										<svg aria-hidden="true" className="w-[15px] h-[15x] animate-spin-fast dark:text-gray-600 fill-[#F5F9FC]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
										</svg>
										:<svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor">
											<path clipRule="evenodd" fillRule="evenodd" d="M10 2.75A1.25 1.25 0 0 0 8.75 4v1.25h6.5V4A1.25 1.25 0 0 0 14 2.75h-4Zm6.75 2.5V4A2.75 2.75 0 0 0 14 1.25h-4A2.75 2.75 0 0 0 7.25 4v1.25H3a.75.75 0 0 0 0 1.5h1.25V20A2.75 2.75 0 0 0 7 22.75h10A2.75 2.75 0 0 0 19.75 20V6.75H21a.75.75 0 0 0 0-1.5h-4.25Zm-11 1.5V20A1.25 1.25 0 0 0 7 21.25h10A1.25 1.25 0 0 0 18.25 20V6.75H5.75Zm4.25 3.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z"></path>
										</svg>
									}
									
									<span className="text-[14px]">Delete Project</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-40 opacity-70 bg-[#0e1525A0]" ></div>
		</>
	)
}

export default DeletionAlertModal