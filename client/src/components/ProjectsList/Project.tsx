
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import {useState, useRef, useEffect} from "react"
import Popover from "../Popover"
import { useGetGuests } from "../../hooks/useGetGuests"

const Project = ({ name, id, onDelete, ownerId }: IProjectProps) => {
	const { loadingGuests, guestsList } = useGetGuests(id);
	const [guestNumber, setGuestNumber] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (!loadingGuests && guestsList !== undefined) {
			const guestNumber = guestsList.length; 
			setGuestNumber(guestNumber);
		}
	}, [loadingGuests, guestsList]);

	const [open, setOpen] = useState(false);
	const user = useAuthContext();
	const navigate = useNavigate();
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
	
	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpen(!open);
	}

	return (
		<>
			<tr className="relative hover:bg-[#646464b3] hover:cursor-pointer"
				onClick = {()=>navigate(`/edit/${id}`)}>
				<td className="cell text-[hsl(0,0%,80%)]">
					<div className="projectRowCell">
						<span>
						{name} 
						</span>
					</div>
				</td>
				<td className="cell">
					<span className="projectRowCell">
						{name} program run on CodeCollab
					</span>
				</td>
				<td className="cell">
					<span className="projectRowCell">
						<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
							<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
						</svg>
						<span>{guestNumber}</span>
					</span>
				</td>
				<td className="cell">
					<span className="projectRowCell">
						Updated 7 minutes ago
					</span>
				</td>
				{ownerId === user._id &&
				<td className="cell w-[38px] text-right">
						<div className="flex relative min-h-full items-center">
							<button ref={toggleButtonRef} onClick ={handleToggle} className="w-[38px] h-[38px] align-middle inline-flex items-center justify-center hover:text-[hsl(0,0%,94%)]">
								<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor">
									<path fillRule = "evenodd" d="M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" clipRule="evenodd">
									</path>
								</svg>
							</button>
						<Popover toggleRef={toggleButtonRef}  onDelete={onDelete} open={open} onClose={()=>setOpen(false)} deleteInfo={{userId: user._id, projectId: id}} />
						</div>
				</td>
				}
			
				{/* { ownerId === user._id && <button className="mx-10 mr-0 bg-gray-800 p-2" onClick={handleDelete}>Delete</button>} */}
			</tr>		
		</>

	)
}


export default Project;