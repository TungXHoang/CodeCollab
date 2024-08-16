import Project from "./Project";
import { IProject, IProjectsListProps } from "./IProject";
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
							<tr className="z-10 sticky top-0">
								<th className="headerCell">
									<span className="headerCellWrapper">Title</span>
								</th>
								<th className="headerCell">
									<span className="headerCellWrapper">Description</span>
								</th>
								{!isOwner &&
									<th className="headerCell">
										<span className="headerCellWrapper">Owner</span>
									</th> }
								<th className="headerCell">
									<span className="headerCellWrapper">Guests</span>
								</th>
								<th className="headerCell">
									<span className="headerCellWrapper">Updated</span>
								</th>
								<th className="headerCell">
								</th>
							</tr>
						</thead>
						<tbody>
							{projectsList.map((project: IProject) => (
								<Project
									key={project._id}
									name={project.title}
									id={project._id}
									onDelete={onDelete}
									ownerId={project.owner._id}
									ownerEmail={project.owner.email}
									updateAt = {project.updatedAt}
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