
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import ProjectPopover from "../ProjectPopover"
import { useGetGuests } from "../../hooks/useGetGuests"

const Project = ({ onDelete, project, isChecked, onCheck}: IProjectProps) => {
	const { guestsList, setGuestsList } = useGetGuests(project._id);
	const user = useAuthContext();
	const navigate = useNavigate();
	
	return (
		<>
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
						{guestsList ?
							<>
								<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
									<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
								</svg>
								<span>{guestsList.length}</span>
							</>
							:
							<svg aria-hidden="true" className="ml-[0.5em] w-[15px] h-[15x] animate-spin-fast dark:text-gray-600 fill-[#E4E8F1]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
							</svg> 
						}
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
			</tr>		
		</>

	)
}


export default Project;