import Project from "./Project";
import { IProject, IProjectsListProps } from "./IProject";
import { useState, useRef, useEffect} from "react";
import SelectionModal from "../SelectionModal"
import useCheckbox from "../../hooks/useCheckbox";
import CheckboxModal from "../CheckboxModal";

const ProjectsList = ({ projectsList, isOwner, onCreate, onDelete }: IProjectsListProps) => {
	const [showModal, setShowModal] = useState(false);
	const selectAllRef = useRef<HTMLInputElement>(null);

	const {isCheckedAll,isChecked,handleCheck,handleCheckedAll,resetCheckBox} = useCheckbox(projectsList, selectAllRef);
	

	const handleDelete = (idList: string[]) => {
		resetCheckBox();
		onDelete(idList);
	}
	


	useEffect(() => {
		resetCheckBox();
	}, [isOwner])


	return (
		<>
			{projectsList.length > 0 ?
				<div className="m-[-30px] mt-0 p-[30px] pt-0">
					<table className="w-full border-collapse">
						<thead>
							<tr className="z-10 sticky top-0">
								<th className="headerCell pl-[6px]">
									<span>
										<label>
											<span className="sr-only">Select all projects</span>
											<input ref={selectAllRef} checked={isCheckedAll} onChange={handleCheckedAll} type="checkbox" className="_input_custom hover:!bg-transparent checked:!border-[hsl(220,10%,80%)] focus:text-primary focus:ring-offset-0 focus:ring-0 focus:!bg-transparent" ></input>
										</label>
									</span>
								</th>
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
									onDelete={handleDelete}
									project={project}
									onCheck={(project,checked)=>handleCheck({project:project, checked:checked})}
									isChecked={isChecked.includes(project)}
								/>
							))}
						</tbody>
					</table>
				</div>
			: (
				<> {isOwner ?
					<div className="px-[6.25em] py-[8em] text-[hsl(0,0%,62%)] font-[600] text-[18px] text-center">
						<button onClick={() => setShowModal(true)} className="text-[hsl(186,52%,48%)] hover:text-[hsl(191,91%,69%)]">Create</button>
						{' '}your first project
					</div >
					: <div className="px-[6.25em] py-[8em] text-[hsl(0,0%,62%)] font-[600] text-[18px] text-center">You have no shared projects yet</div>} </>
			)
			}
			{showModal &&
				<SelectionModal onSelect={setShowModal} onCreate={onCreate} />
			}
			{isChecked.length > 0 &&
				<CheckboxModal onDelete={handleDelete} selectedProject={isChecked} />
			}
			</>
	);
};
export default ProjectsList;