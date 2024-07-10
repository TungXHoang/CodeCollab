import Project from "./Project";

const ProjectsList = ({projectsList, onDelete}: any) => {
	const handleDeleteProject = (projectId: string) => {
		onDelete(projectsList.filter((project: { _id: string; }) => project._id !== projectId));
	}
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{ projectsList.map((project:any) => (
					<Project
						key={project._id}
						name={project.title}
						id={project._id}
						onDelete = {handleDeleteProject}
					/>
				))
			}
		</div>
	);
};
export default ProjectsList;