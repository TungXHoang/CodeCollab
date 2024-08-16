import Project from "./Project";
import { IProjectsListProps } from "./IProject";
import { useState } from "react";
import SelectionModal from "../../components/SelectionModal"


const ProjectsList = ({ projectsList, onDelete, onCreate, isOwner }: IProjectsListProps) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			{projectsList.length > 0 ?
				<div className="m-[-30px] mt-0 p-[30px] pt-0">
					<table className="w-full border-collapse">
						<thead>
							<tr className="flex">
								<th className="headerCell">
									<span className="headerCellWrapper">Title</span>
								</th>
								<th className="headerCell">
									<span className="headerCellWrapper">Description</span>
								</th>
								<th className="headerCell">
									<span className="headerCellWrapper">Updated</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{projectsList.map((project: any) => (
								<Project
									key={project._id}
									name={project.title}
									id={project._id}
									onDelete={onDelete}
									ownerId={project.owner._id}
								/>
							))}
						</tbody>
					</table>
				</div>
			: (
				<> {isOwner ?
					<div>
						<button onClick={() => setShowModal(true)} className="text-[hsl(186,52%,48%)] hover:text-[hsl(191,91%,69%)]">Create</button>
						{' '}your first project
					</div>
					: <div>You have no shared projects yet</div>} </>
			)
			}
				{showModal &&
					<SelectionModal onSelect={setShowModal} onCreate={onCreate} />
				}
			</>
	);
};
export default ProjectsList;