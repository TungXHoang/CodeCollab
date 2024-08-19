import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthContext } from "../../context/AuthContext.tsx"
import { shareProject } from "../../foundation/projectsAPI";
import {IProject, IOwner} from "../ProjectsList/IProject.tsx"
import {showShareToast} from "../../foundation/utils/ToastMessage.tsx"
import "react-toastify/dist/ReactToastify.css";
import { useGetGuests } from "../../hooks/useGetGuests.tsx";
import InviteesList from "./InviteesList.tsx";

interface IShareModalProps {
	onShare: (guest:IOwner)=> void,
	onClose: () => void,
	project: IProject,
	toastContainerId: string,
}

const ShareModal = ({ onClose, onShare, project, toastContainerId }: IShareModalProps) => {	
	const user = useAuthContext();
	const { loadingGuests, guestsList } = useGetGuests(project._id);
	const [copySuccess, setCopySuccess] = useState(false);
	const [shareUser, setShareUser] = useState("")
	const [guests, setGuests] = useState< IOwner[]|undefined>(undefined);

	useEffect(() => {
		if (!loadingGuests && guestsList !== undefined) {
			const inviteesList: IOwner[] = guestsList.map((guest)=>guest.guestId)
			setGuests(inviteesList);
		}
	}, [loadingGuests, guestsList]);


	//  utils functions
	const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
		setShareUser(e.currentTarget.value);
	}
	const CopyToClip = async () => {
		await navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`); 
    setCopySuccess(true);
	}

	const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShareUser("");
		const formData = {guestEmail:shareUser, ownerId:user._id, projectId: project._id }
		const res = await shareProject(formData);
		showShareToast(res!.status, res!.data.message, { containerId: toastContainerId });
		if (res!.status === 201) {
			setGuests((prevGuests) => (prevGuests ? [...prevGuests, res!.data.guest] : [res!.data.guest]));
			onShare(res!.data.guest);
		}
		return res;
	}

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose()
	}

	return createPortal(
		<> 
			{ guests &&
				<div className="cursor-auto top-0 right-0 bottom-0 right-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					onClick={handleClose}>
					<div className="absolute left-0 right-0 top-[100px] w-full max-w-[550px] mx-auto" onClick={(e) => e.stopPropagation()}>
						{/* top nav */}
						<div className="max-w-fit">
							<div className="bg-[hsl(220,15%,24%)] flex items-center bg-[hsl(220,15%,24%)] text-[hsl(0,0%,94%)] px-[24px] py-[12px]"> 
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="20px" height="20px" className="mr-[10px]">
									<path d="M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13m4.894 4a5.53 5.53 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676zm.582 2.995A5 5 0 0 0 14 7.5a5.5 5.5 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10 10 0 0 1-.206 2h2.493q.142-.494.19-1.005zm-3.535 0 .006-.051A9 9 0 0 0 10.5 7a9 9 0 0 0-.076-1H6.576A9 9 0 0 0 6.5 7a9 9 0 0 0 .233 2h3.534q.115-.498.174-1.005M10.249 5a9 9 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a4 4 0 0 0-.312.015l-.182.015L8 2.04A9 9 0 0 0 6.751 5zM5.706 5a10 10 0 0 1 .966-2.681A5.53 5.53 0 0 0 3.606 5zM3.213 6A5.5 5.5 0 0 0 3 7.5 5.5 5.5 0 0 0 3.213 9h2.493A10 10 0 0 1 5.5 7c0-.336.023-.669.055-1zm2.754 4h-2.36a5.52 5.52 0 0 0 3.819 2.893A10 10 0 0 1 5.967 10M8.5 12.644A9 9 0 0 0 9.978 10H7.022A9 9 0 0 0 8.5 12.644M11.033 10a10 10 0 0 1-1.459 2.893A5.52 5.52 0 0 0 13.393 10z"/> 
								</svg>  
								Share 
							</div>
						</div>
						<div className="bg-[hsl(220,15%,24%)]">
							<div className="flex flex-col">
								{/* shareUrl section */}
								<div className="p-[20px] flex flex-col">
									<label className="text-left pb-[8px] text-[hsl(0,0,80%)] font-[400]">
										<b>Editor Url</b>
									</label>
									<div className="flex text-[hsl(0,0,80%)] items-center">
										<span className="w-full text-[14px]">
											<input className="outline-none focus:border-[hsl(205,100%,50%)] px-2 py-1 w-full bg-[hsl(0,0%,0%,0.15)] border-[1px] border-[hsl(220,10%,45%)]" type="text" readOnly value={`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`} />
										</span>
										<button onClick={CopyToClip} className="flex items-center text-[12px] shrink-0 ml-[8px] bg-[hsl(191,91%,69%)] text-[hsl(220,18%,10%)] px-[6px] py-[6px] h-full">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14px" height="14px" className="mr-[3px]">
											{!copySuccess ? <path d="m12.5 4 .5.5v10l-.5.5h-9l-.5-.5v-10l.5-.5H5V3h1a2 2 0 0 1 4 0h1v1zM8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2M4 14h8V5H4z"/> :<path d="m14.431 3.323-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506z"/>}
											</svg>  
											Copy URL 
										</button>
									</div>
								</div>
								{/* shareAccess section */}
								<div className="p-[20px] pt-0 text-[hsl(0,0,80%)] flex flex-col ">
									<label className="text-left pb-[8px] text-[hsl(0,0,80%)] font-[400]">
										<b>Share with other users</b>
									</label>
									<form className="flex flex-col text-[hsl(0,0,80%)] ">
										<span className="w-[417px] text-[14px]">
											<input autoComplete="off" required name = "email" placeholder="Enter email..." className="outline-none focus:border-[hsl(205,100%,50%)] px-2 py-1 w-full bg-[hsl(0,0%,0%,0.15)] border-[1px] border-[hsl(220,10%,45%)]" type="email" value={shareUser}  onChange={handleChange} />
										</span>
										<button onClick={handleShare} className="flex items-center text-[12px] shrink-0 mt-[20px] bg-[hsl(191,91%,69%)] text-[hsl(220,18%,10%)] px-[8px] py-[8px] h-full w-fit">
											Share
										<svg className="mx-[5px]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="14px" height="14px"><path d="M 15.990234 1.9902344 A 1.0001 1.0001 0 0 0 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 A 1.0001 1.0001 0 1 0 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 A 1.0001 1.0001 0 1 0 16.707031 11.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 20.707031 6.2929688 L 16.707031 2.2929688 A 1.0001 1.0001 0 0 0 15.990234 1.9902344 z M 2.984375 7.9863281 A 1.0001 1.0001 0 0 0 2 9 L 2 19 C 2 20.64497 3.3550302 22 5 22 L 19 22 C 20.64497 22 22 20.64497 22 19 L 22 18 A 1.0001 1.0001 0 1 0 20 18 L 20 19 C 20 19.56503 19.56503 20 19 20 L 5 20 C 4.4349698 20 4 19.56503 4 19 L 4 9 A 1.0001 1.0001 0 0 0 2.984375 7.9863281 z"/></svg>
										</button>
									</form>
									
								</div>
								{<InviteesList project={project} guests={guests} />}
							</div>
						</div>
					</div>
				</div>
			}
			<div className="opacity-50 fixed inset-0 z-40 bg-black" ></div>
		</>, document.body,
	)
}

export default ShareModal