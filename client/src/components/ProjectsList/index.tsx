import Project from "./Project";
import { IProjectsListProps } from "./IProject" 



const ProjectsList = ({ projectsList, onDelete }: IProjectsListProps) => {

	// const handleDeleteProject = (projectId: string) => {
	// 	onDelete(projectId);
	// }

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{projectsList.map((project: any) => (
				<Project
					key={project._id}
					name={project.title}
					id={project._id}
					onDelete={onDelete}
					ownerId={project.owner._id}
					/>
				))
			}
		</div>
	);
};
export default ProjectsList;