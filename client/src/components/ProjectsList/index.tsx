import Project from "./Project";
import { IProjectsListProps } from "./IProject";
import { useState } from "react";
import SelectionModal from "../../components/SelectionModal"


const ProjectsList = ({ projectsList, onDelete, onCreate, isOwner }: IProjectsListProps) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			{projectsList.length > 0 ? (
				<div className='py-2 flex flex-col overflow-auto'>
					{projectsList.map((project: any) => (
						<Project
							key={project._id}
							name={project.title}
							id={project._id}
							onDelete={onDelete}
							ownerId={project.owner._id}
						/>
					))}
				</div>
			) : (
			<> {isOwner ?
				<div>
					<button onClick={()=>setShowModal(true)} className="text-[hsl(186,52%,48%)] hover:text-[hsl(191,91%,69%)]">Create</button>
					{' '}your first project
				</div>
				: <div>You have no shared projects yet</div>} </>
			)}
			{showModal &&
				<SelectionModal onSelect={setShowModal} onCreate={onCreate} />
			}
		</>
	);
};
export default ProjectsList;