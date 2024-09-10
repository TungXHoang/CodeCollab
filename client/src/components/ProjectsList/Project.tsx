
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import ProjectPopover from "../ProjectPopover"
import { useGetGuests } from "../../hooks/useGetGuests"
import {ProjectSkeleton} from "../SkeletonComponent/ProjectSkeleton"

const Project = ({ onDelete, project, isChecked, onCheck}: IProjectProps) => {
	const { guestsList, setGuestsList } = useGetGuests(project._id);
	const user = useAuthContext();
	const navigate = useNavigate();
	
	return (
		<>
			{ guestsList ?
				<tr className={`relative hover:bg-[#2B3245] w-full hover:cursor-pointer ${isChecked ? "bg-[#192236]": "" }`}
				onClick={() => navigate(`/edit/${project._id}`)}>
				<td onClick={(e) => e.stopPropagation()} data-cell-type="checkbox" className="cell pl-[6px] pt-[7px]">
					<label className="h-[16px]">
						<span className="sr-only">Select {project.title}</span>
						<input checked={isChecked}  onChange={() => onCheck(project, isChecked)} onClick={(e) => e.stopPropagation()} type="checkbox" className="checkbox-shadow dashboard-checkbox cursor-pointer focus:text-primary focus:ring-offset-0 focus:ring-0"></input>
					</label>
				</td>
				<td className="cell text-[#E4E8F1]">
					<div className="projectRowCell">
						<span>
						{project.title} 
						</span>
					</div>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						{project.description}
					</span>
				</td>
				{project.owner._id !== user._id &&
					<td className="cell text-[#E4E8F1]">
						<span className="projectRowCell">
							<span>{project.owner.email}</span>
						</span>
					</td>}
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
							<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
						</svg>
						<span>{guestsList.length}</span>
					</span>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						{project.updatedAt}
					</span>
				</td>
				{project.owner._id === user._id &&
					<ProjectPopover guestsList={guestsList} onEditGuest={setGuestsList} onDelete={onDelete} project={project}  userId={user._id} />
				}
				</tr> :
				<ProjectSkeleton/>
			}
		</>
		
			

	)
}


export default Project;