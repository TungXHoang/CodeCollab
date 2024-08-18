
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import Popover from "../Popover"
import { useGetGuests } from "../../hooks/useGetGuests"

const Project = ({ onDelete, project}: IProjectProps) => {
	const { loadingGuests, guestsList } = useGetGuests(project._id);
	const [guestNumber, setGuestNumber] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (!loadingGuests && guestsList !== undefined) {
			const guestNumber = guestsList.length; 
			setGuestNumber(guestNumber);
		}
	}, [loadingGuests, guestsList]);

	const user = useAuthContext();
	const navigate = useNavigate();
	
	return (
		<>
			<tr className="relative hover:bg-[#646464b3] hover:cursor-pointer"
				onClick = {()=>navigate(`/edit/${project._id}`)}>
				<td className="cell text-[hsl(0,0%,80%)]">
					<div className="projectRowCell">
						<span>
						{project.title} 
						</span>
					</div>
				</td>
				<td className="cell">
					<span className="projectRowCell">
						{project.title} program run on CodeCollab
					</span>
				</td>
				{project.owner._id !== user._id &&
					<td className="cell">
						<span className="projectRowCell">
							<span>{project.owner.email}</span>
						</span>
					</td>}
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
						{project.updatedAt}
					</span>
				</td>
				{project.owner._id === user._id &&
					<Popover project={project} onDelete={onDelete} userId={user._id} />
				}
			</tr>		
		</>

	)
}


export default Project;