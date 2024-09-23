
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps,IProfileProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import ProjectPopover from "../ProjectPopover"
import { useGetGuests } from "../../hooks/useGetGuests"


export const Project = ({ onDelete, project, isChecked, onCheck}: IProjectProps) => {
	const { guestsList, setGuestsList } = useGetGuests(project._id);
	const {user} = useAuthContext();
	const navigate = useNavigate();
	
	return (
		<tr className={`relative hover:bg-[#2B3245] w-full hover:cursor-pointer ${isChecked ? "bg-[#192236]": "" }`} onClick={() => navigate(`/edit/${project._id}`)}>
			<td onClick={(e) => e.stopPropagation()} data-cell-type="checkbox" className="cell pl-[6px] pt-[7px]">
				<label className="h-[16px]">
					<span className="sr-only">Select {project.title}</span>
					<input checked={isChecked}  onChange={() => onCheck(project, isChecked)} onClick={(e) => e.stopPropagation()} type="checkbox" className="checkbox-shadow dashboard-checkbox cursor-pointer focus:text-primary focus:ring-offset-0 focus:ring-0"></input>
				</label>
			</td>
			<td className="cell w-[28px] pt-[12px] pl-[5px]">
				<img className="w-[16px]" src={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}${project.language}.png?tr=w-100,h-100,f-png,lo-true`} />
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
			{project.owner._id !== user._id && <td className="cell text-[#E4E8F1]">
				<span className="projectRowCell">
					<span>{project.owner.email}</span>
				</span>
			</td>}
			<td className="cell text-[#E4E8F1]">
				<span className="projectRowCell">
					<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
						<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
				</svg>
				{guestsList && <span>{guestsList.length}</span> }
					
				</span>
			</td>
			<td className="cell text-[#E4E8F1]">
				<span className="projectRowCell">
					{project.updatedAt}
				</span>
			</td>
			{project.owner._id === user._id &&
				<td className="cell w-[38px] text-right">
					<ProjectPopover guestsList={guestsList} onEditGuest={setGuestsList} onDelete={onDelete} project={project} />
				</td>
			}
		</tr>
	)
}

export const ProfileProject = ({ project,onDelete, isOwner }: IProfileProjectProps) => {
	const { guestsList,setGuestsList } = useGetGuests(project._id);
	return (
		<li className="mb-[12px] relative px-[16px] py-[12px] rounded-[4px] bg-[#1C2333] text-[#C2C8CC] cursor-pointer">
			<a className="text-[#5CD2F4] hover:text-[#80E4FF]" href={`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`}>
				<h3 className="flex items-center text-[#5CD2F4] font-bold">
					<span>{project.title}</span>
				</h3>
				<div className="my-2 text-[#E4E8F1]">{project.description}</div>
				<div className="flex items-center text-[hsl(0,0%,80%)] text-[11px]">
					<div className="flex items-center">
						<img className="w-[16px]" src={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}${project.language}.png?tr=w-100,h-100,f-png,lo-true`} />
						<span className="ml-1 mr-8">{project.language.charAt(0).toUpperCase() + project.language.slice(1)}</span>
					</div>
					<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
						<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
					</svg>
					<span className="ml-[1px] mr-8">{ guestsList && guestsList.length}</span>
					<span>{project.updatedAt}</span>
				</div>
			</a>
			{isOwner &&	<div className="absolute right-0 top-0">
				<ProjectPopover project={project} onDelete={onDelete} guestsList = {guestsList} onEditGuest={setGuestsList} />
			</div> }
		</li>
	)
}