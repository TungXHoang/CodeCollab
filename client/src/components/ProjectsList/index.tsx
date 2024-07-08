import useGetProjects from "../../hooks/useGetProjects";
import Project from "./Project";

const ProjectsList = () => {
	const { loading, projects } = useGetProjects();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{!loading ? (
				projects.map((project:any) => (
					<Project
						key={project._id}
						name={project.title}
					/>
				))
			) : (
				<span className='loading loading-spinner mx-auto'></span>
			)}
		</div>
	);
};
export default ProjectsList;