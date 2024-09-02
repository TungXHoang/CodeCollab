import { useState,useRef } from 'react';
import {showToast } from "../../foundation/utils/ToastMessage.tsx"
import {saveProject} from "../../foundation/projectsAPI"
// sub-component
import ProfileDropdown from "../ProfileDropdown"
import ShareModal from "../../components/ShareModal";
import { useGetGuests } from "../../hooks/useGetGuests"
// Interface
import { IAuthUser } from "../../types/auth";
import { IProject } from "../../components/ProjectsList/IProject";

interface IEditingNavRightGroup {
	project: IProject;
	user: IAuthUser;
}

const EditingNavRightGroup = ({project,user}:IEditingNavRightGroup) => {
	const [isSpinning, setIsSpinning] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const { guestsList, setGuestsList } = useGetGuests(project._id);

	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
	const handleClick = async () => {
		setIsSpinning(true);
		const minimumSpinnerDuration = 2000;
		const saveProjectPromise = saveProject({ docName: project._id });
		const delayPromise = wait(minimumSpinnerDuration);
	
		Promise.all([saveProjectPromise, delayPromise])
			.then(([res]) => {
				showToast("success","Save successfully!", {containerId:"EditingToast"})
				return res;
			})
			.catch(error => {
				console.error('Error saving project:', error);
				showToast("error","Save fail!", {containerId:"EditingToast"})
			})
			.finally(() => {
				setIsSpinning(false);
			});
	};


	const handleToggleShareModal = (status: boolean) => {
		status ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
		setShowShareModal(status);
	}

	const handleToggleDropdown = () => {
		!showProfileDropdown ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
		setShowProfileDropdown(!showProfileDropdown)
	}

	
	return (
		<div className="flex items-center gap-[8px] ml-auto">
			<button onClick={handleClick} className=" transition-all duration-200 ease-in-out text-white bg-[#1C2333] font-[400] items-center rounded-[6px] border-[1px] border-[#0000] flex gap-[8px] h-[32px] px-[10px] text-[13px] hover:border-[hsl(220,60%,95%)]/[0.14] hover:bg-[hsl(220,60%,95%)]/[0.1]">
				<span className="flex color-inherit items-center  justify-center h-fit w-fit">
					{
						isSpinning ?
						<svg aria-hidden="true" className="w-4 h-4 animate-spin-fast dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
			{project.owner._id === user._id &&
				<div className="group h-full relative">
					<button disabled={project.owner._id !== user._id} onClick={() => handleToggleShareModal(true)} className={`transition-all duration-200 ease-in-out text-white bg-[#1C2333] font-[400] items-center rounded-[6px] border-[1px] border-[#0000] flex gap-[8px] h-[32px] px-[10px] text-[13px] ${project.owner._id === user._id ? 'hover:border-[hsl(220,60%,95%)]/[0.14] hover:bg-[hsl(220,60%,95%)]/[0.1]' : ''} `}>
						<svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor" >
							<path fillRule="evenodd" clipRule="evenodd" d="M8.5 3.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM3.75 7a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0ZM20 7.25a.75.75 0 0 1 .75.75v2.25H23a.75.75 0 0 1 0 1.5h-2.25V14a.75.75 0 0 1-1.5 0v-2.25H17a.75.75 0 0 1 0-1.5h2.25V8a.75.75 0 0 1 .75-.75ZM1.641 15.641A4.75 4.75 0 0 1 5 14.25h7A4.75 4.75 0 0 1 16.75 19v2a.75.75 0 0 1-1.5 0v-2A3.25 3.25 0 0 0 12 15.75H5A3.25 3.25 0 0 0 1.75 19v2a.75.75 0 0 1-1.5 0v-2c0-1.26.5-2.468 1.391-3.359Z"></path>
						</svg>
						<span className="text-[14px] flex items-center flex-row justify-center overflow-hidden">Invite</span>
					</button>
				</div>
			}
			
			<div className=""> 
				<button ref={toggleButtonRef} onClick={handleToggleDropdown} className="flex items-center gap-[3px] p-[6px] px-[8px] hover:bg-[#1C2333] rounded-[4px]"> 
					<div className="w-[21px] h-[21px] hover:border-[hsl(220,10%,16.5%)] focus-visible:border-[hsl(220,10%,16.5%)] rounded-full">
						<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
					</div>
					<svg width="12px" height="12px" viewBox="0 0 24 24" fill="#9DA2A6">
						<path fillRule="evenodd" clipRule="evenodd" d="M12.53 15.53a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06L12 13.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z"></path>
					</svg>
				</button>
				{showProfileDropdown &&
					<ProfileDropdown user={user} toggleButtonRef={toggleButtonRef} isShow={showProfileDropdown} onClose={()=>setShowProfileDropdown(false)} />
				}
			</div>
			
			{showShareModal && <ShareModal onEditGuest={setGuestsList} guestsList={guestsList} toastContainerId={"EditingToast"} project={project} onClose={() => handleToggleShareModal(false)} />}
		</div>
	)

}

export default EditingNavRightGroup