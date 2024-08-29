import { IProject, IOwner } from "../ProjectsList/IProject.tsx"
import { deleteGuest } from "../../foundation/projectsAPI";
import { useAuthContext } from "../../context/AuthContext.tsx";
import {showDashboardToast} from "../../foundation/utils/ToastMessage.tsx"

interface IInviteesList {
	project: IProject,
	guests: IOwner[],
	onDelete: (guestId:string)=>void
}

const InviteesList = ({ project, guests, onDelete }:IInviteesList ) => {

	const user = useAuthContext()
	const handleDelete = async ({ guestId, projectId }:{guestId:string,projectId:string}) => {
		const res = await deleteGuest({ userId:user._id, guestId: guestId, projectId: projectId })
		if (res!.status === 200) {
			onDelete(guestId);
			showDashboardToast("Delete guest successfully!", "success");
		}
		else {
			showDashboardToast("Error occur when deleting guest", "error");
		}
	}

	return (
		<ul className="p-[20px] pt-0">
			<li className="flex items-center py-[5px] pl-[5px] text-[hsl(0,0,80%)] border-t-[1px] border-dashed border-[hsl(220,10%,30%)] last:border-b-[1px]">
				<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full w-[16px h-[16px] mr-[10px]" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
				<div className="flex items-center py-[4px]">{project.owner.email}</div>
				<div className="flex items-center ml-auto basis-[164px] py-[4px] px-[8px]">Owner</div>

			</li>
			{
				guests.map(guest =>
					<li key={guest._id} className="flex text-[hsl(0,0,80%)] pl-[5px] items-center py-[5px] border-t-[1px] border-dashed border-[hsl(220,10%,30%)] last:border-b-[1px]">
						<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full w-[16px h-[16px] mr-[10px]" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
						<div className="flex items-center py-[4px]">{guest.email}</div>
						<div className="flex items-center ml-auto basis-[140px] px-[8px]">Guest</div>
						<button onClick={()=>handleDelete({guestId: guest._id,projectId:project._id})} className ="text-[13px] font-[400] flex items-center cursor-pointer text-[hsl(355,80%,65%)] max-w-[25px]" >
							<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" className="mr-[8px]"> 
								<path fillRule="evenodd" clipRule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zM9 2H6v1h3zM4 13h7V4H4zm2-8H5v7h1zm1 0h1v7H7zm2 0h1v7H9z"></path>
							</svg>
						</button>
					</li>
				)
			}
		</ul>
	)
}

export default InviteesList