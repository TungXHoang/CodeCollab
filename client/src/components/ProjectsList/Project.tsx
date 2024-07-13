import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { deleteProject } from "../../foundation/projectsAPI"
import { IProjectProps} from "./IProject"
import { useNavigate } from "react-router-dom";

const Project = ({ name, id, onDelete }: IProjectProps) => {
	const user = useContext(UserContext);
	const handleDelete = async (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const res = await deleteProject({projectId: id, userId: user._id})
		if (res.status === 200) {
			onDelete(id)
		}
		return res;
	}
	const navigate = useNavigate();
	const handleNavigate = (projectId: string) => {
		navigate(`/edit/${projectId}`);
	}
	return (
		<>
			<div className="flex flex-row my-2 items-center justify-between hover:bg-[#646464b3]"
					onClick = {()=>handleNavigate(id)}
				>
				<div className="hover:cursor-pointer p-2">{name} project</div>
				<button className="mx-10 mr-0 bg-gray-800 p-2" onClick={handleDelete}>Delete</button>
			</div>		
		</>

	)
}


export default Project;