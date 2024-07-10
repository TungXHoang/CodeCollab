import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { deleteProject } from "../../foundation/projects"
import { IProjectProps} from "./IProject"

const Project = ({ name, id, onDelete }: IProjectProps) => {
	const user = useContext(UserContext);
	const handleDelete = async () => {
		const res = await deleteProject({projectId: id, userId: user._id})
		if (res.status === 200) {
			onDelete(id)
		}
		return res;
	}
	return (
		<>
			<div className="flex flex-row my-2">
				<div>{name} project</div>
				<button className="mx-10 bg-gray-800 p-2" onClick={handleDelete}>Delete</button>
			</div>		
		</>

	)
}


export default Project;