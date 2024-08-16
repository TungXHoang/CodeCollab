
import { useAuthContext } from '../../context/AuthContext';
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import Popover from "../Popover"

const Project = ({ name, id, onDelete, ownerId }: IProjectProps) => {
	const [open, setOpen] = useState(false);
	const user = useAuthContext();
	const navigate = useNavigate();
	
	
	const handleToggle = (e: any) => {
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
						Updated 7 minutes ago
					</span>
				</td>
				{ownerId === user._id &&
					<td className="cell w-[38px] text-right">
							<div className="flex relative min-h-full items-center">
								<button onClick ={handleToggle} className="w-[38px] h-[38px] align-middle inline-flex items-center justify-center hover:text-[hsl(0,0%,94%)]">
									<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor">
										<path fillRule = "evenodd" d="M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" clipRule="evenodd">
										</path>
									</svg>
								</button>
								<Popover onDelete={onDelete} open={open} onClose={()=>setOpen(false)} deleteInfo={{userId: user._id, projectId: id}} />
							</div>
					</td>
				}
			
				{/* { ownerId === user._id && <button className="mx-10 mr-0 bg-gray-800 p-2" onClick={handleDelete}>Delete</button>} */}
			</tr>		
		</>

	)
}


export default Project;