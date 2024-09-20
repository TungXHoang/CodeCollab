import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuthContext } from "../../context/AuthContext.tsx"
import { shareProject } from "../../foundation/projectsAPI";
import { IProject } from "../../types/project";
//Subcomponent
import SearchSuggest from "./SearchSuggest.tsx";
import InviteesList from "./InviteesList.tsx";
import { IGuestList } from "../../hooks/useGetGuests";


interface IShareModalProps {
	onClose: () => void,
	onEditGuest: React.Dispatch<React.SetStateAction<IGuestList[] | undefined>>
	guestsList: IGuestList[] | undefined,
	project: IProject,
	toastContainerId: string,
}

const ShareModal = ({ guestsList,onEditGuest,onClose, project, toastContainerId }: IShareModalProps) => {	
	const {user} = useAuthContext();
	const [copySuccess, setCopySuccess] = useState(false);
	const [filterQuery, setFilterQuery] = useState("")
	

	const CopyToClip = async () => {
		await navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`); 
    setCopySuccess(true);
	}

	const handleShare = async (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {3
		if (e) e.preventDefault();
		setFilterQuery("");
		const shareParams = { guestEmail: filterQuery, ownerId: user._id, projectId: project._id, toastContainer: toastContainerId }
		const result = await shareProject(shareParams);
		if (result) {
			const newGuest = { project: project._id, guest:result.guest}
			onEditGuest((prevGuests) => (prevGuests ? [...prevGuests, newGuest] : [newGuest]));
		}	
	}

	const handleDeleteGuest = (guestId:string) => {
		onEditGuest(prevGuests => prevGuests!.filter(guest => guest.guest._id !== guestId))
	}

	return createPortal(
		<> 
			{ guestsList &&
				<div className="cursor-auto top-0 right-0 bottom-0 right-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}>
					<div className="absolute left-0 right-0 top-[100px] w-full max-w-[550px] mx-auto" onClick={(e) => e.stopPropagation()}>
						{/* top nav */}
						<div className="max-w-fit ">
							<div className="rounded-[4px] rounded-b-none flex items-center bg-[#1C2333] text-[hsl(0,0%,94%)] px-[24px] py-[12px]"> 
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="20px" height="20px" className="mr-[10px]">
									<path d="M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13m4.894 4a5.53 5.53 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676zm.582 2.995A5 5 0 0 0 14 7.5a5.5 5.5 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10 10 0 0 1-.206 2h2.493q.142-.494.19-1.005zm-3.535 0 .006-.051A9 9 0 0 0 10.5 7a9 9 0 0 0-.076-1H6.576A9 9 0 0 0 6.5 7a9 9 0 0 0 .233 2h3.534q.115-.498.174-1.005M10.249 5a9 9 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a4 4 0 0 0-.312.015l-.182.015L8 2.04A9 9 0 0 0 6.751 5zM5.706 5a10 10 0 0 1 .966-2.681A5.53 5.53 0 0 0 3.606 5zM3.213 6A5.5 5.5 0 0 0 3 7.5 5.5 5.5 0 0 0 3.213 9h2.493A10 10 0 0 1 5.5 7c0-.336.023-.669.055-1zm2.754 4h-2.36a5.52 5.52 0 0 0 3.819 2.893A10 10 0 0 1 5.967 10M8.5 12.644A9 9 0 0 0 9.978 10H7.022A9 9 0 0 0 8.5 12.644M11.033 10a10 10 0 0 1-1.459 2.893A5.52 5.52 0 0 0 13.393 10z"/> 
								</svg>  
								Share 
							</div>
						</div>
						<div className="bg-[#1C2333] rounded-tl-none rounded-[4px]">
							<div className="flex flex-col">
								{/* shareUrl section */}
								<div className="p-[20px] flex flex-col">
									<label className="text-left text-[14px] pb-[8px] text-[#F5F9FC] font-[400]">
										<b className="font-[500]">Editor Url</b>
									</label>
									<div className="flex text-[hsl(0,0,80%)] items-center">
										<span className="w-full text-[14px]">
											<input className="text-[13px] outline-none focus:border-[#0079F2] rounded-[4px] px-2 py-1 w-full bg-[#2B3245] border-[1px] border-[#3C445C] hover:border-[#5F677A]" type="text" readOnly value={`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`} />
										</span>
										<button onClick={CopyToClip} className="flex items-center text-[13px] font-[500] shrink-0 ml-[8px] bg-[#0053A6] hover:bg-[#0079F2] text-[#F5F9FC] px-[6px] py-[6px] h-full rounded-[4px]">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14px" height="14px" className="mr-[3px]">
											{!copySuccess ? <path d="m12.5 4 .5.5v10l-.5.5h-9l-.5-.5v-10l.5-.5H5V3h1a2 2 0 0 1 4 0h1v1zM8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2M4 14h8V5H4z"/> :<path d="m14.431 3.323-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506z"/>}
											</svg>  
											Copy URL 
										</button>
									</div>
								</div>
								{/* shareAccess section */}
								<div className="p-[20px] pt-0 text-[hsl(0,0,80%)] flex flex-col ">
									<label className="text-left text-[14px] pb-[8px] text-[#F5F9FC] font-[400]">
										<b className="font-[500]">Share with other users</b>
									</label>
									<div className="flex text-[hsl(0,0,80%)] ">
										<SearchSuggest filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
										<button disabled={filterQuery === ""} onClick={handleShare} className="flex font-[500] items-center text-[13px] ml-[8px] bg-[#0053A6] hover:bg-[#0079F2] text-[#F5F9FC] p-[5px] pl-0 shrink-0 flex-grow rounded-[4px] max-h-[32px] disabled:cursor-default disabled:pointer-events-none disabled:bg-[#004182] disabled:text-[#0079F2]">
											<svg className="mx-[5px]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="14px" height="14px" fill="currentColor"><path d="M 15.990234 1.9902344 A 1.0001 1.0001 0 0 0 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 A 1.0001 1.0001 0 1 0 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 A 1.0001 1.0001 0 1 0 16.707031 11.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 20.707031 6.2929688 L 16.707031 2.2929688 A 1.0001 1.0001 0 0 0 15.990234 1.9902344 z M 2.984375 7.9863281 A 1.0001 1.0001 0 0 0 2 9 L 2 19 C 2 20.64497 3.3550302 22 5 22 L 19 22 C 20.64497 22 22 20.64497 22 19 L 22 18 A 1.0001 1.0001 0 1 0 20 18 L 20 19 C 20 19.56503 19.56503 20 19 20 L 5 20 C 4.4349698 20 4 19.56503 4 19 L 4 9 A 1.0001 1.0001 0 0 0 2.984375 7.9863281 z"/></svg>
											Add guest
										</button>
									</div>
								</div>
								<InviteesList onDelete={(guestId)=>handleDeleteGuest(guestId)} project={project} guestsList={guestsList} containerId={toastContainerId} />
							</div>
						</div>
					</div>
				</div>
			}
			<div className="fixed inset-0 z-40 bg-[#0e1525A0]" ></div>
		</>, document.body,
	)
}

export default ShareModal