import { useOutletContext } from "react-router-dom";
import { useContext, useState,useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../components/ProjectsList/IProject"
import useGetProjects from "../../hooks/useGetProjects";
import SelectionModal from "../../components/SelectionModal"

export default function Dashboard() {
	type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	const { loading, projects } = useGetProjects();
	const [projectsList, setProjectsList] = useState<IProject[]>([])
	const [showModal, setShowModal]:ModalContextType = useOutletContext();

	useEffect(() => {
    if (!loading) {
      setProjectsList(projects);
    }
	}, [loading, projects]);

	const handleCreate = (newProject: IProject) => {
		setProjectsList(projectsList=>[...projectsList, newProject])
	}

	//context use
	const user = useContext(UserContext)
	return (
		<>
		<div className="h-full bg-[hsl(220,10%,14%)]">
			<main className="flex flex-col p-8">
				<div className="text-white w-full">
					<div> Hello {user.firstName} {user.lastName} </div> 
					<div> This is Dashboard </div>
					<section className="flex flex-col my-10">
						<header>
							<h2 className="text-xl font-medium">All Projects</h2>
						</header>
						{!loading && <ProjectsList projectsList={projectsList} onDelete={setProjectsList} />}
					</section>
					
				</div>
			</main>
		</div>
			{showModal &&
				<SelectionModal onSelect={setShowModal}
					onCreate={(newProject:IProject) => handleCreate(newProject)} />
			}
		</>
	)
}