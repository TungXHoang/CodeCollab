import { useOutletContext } from "react-router-dom";
import { useContext, useState,useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../components/ProjectsList/IProject"
import useGetProjects from "../../hooks/useGetProjects";
import SelectionModal from "../../components/SelectionModal"

export default function Dashboard() {
	//context use
	const user = useContext(AuthContext)
	type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	const { loading, projects } = useGetProjects(user._id);
	const [ownerProjectsList, setOwnerProjectsList] = useState<IProject[]>([])
	const [guestProjectsList, setguestProjectsList] = useState<IProject[]>([])
	const [showModal, setShowModal]:ModalContextType = useOutletContext();

	useEffect(() => {
		if (!loading) {
			setOwnerProjectsList(projects.owner);
			setguestProjectsList(projects.guest);
    }
	}, [loading, projects]);

	const handleCreate = (newProject: IProject) => {
		setOwnerProjectsList(ownerProjectsList=>[...ownerProjectsList, newProject])
	}

	
	return (
		<>
		<div className="h-screen overflow-hidden bg-[hsl(220,10%,14%)]">
			<main className="flex flex-col p-8">
				<div className="text-white w-full">
					<div> Hello {user.firstName} {user.lastName} </div> 
					<div> This is Dashboard </div>
					<section className="flex flex-col my-10 max-w-max">
						<header>
							<h2 className="text-xl font-medium">All Projects</h2>
						</header>
							{!loading && <ProjectsList projectsList={ownerProjectsList} onDelete={setOwnerProjectsList}  />}
						<div> Guest Project</div>
							{!loading && <ProjectsList projectsList={guestProjectsList} onDelete={setOwnerProjectsList}  />}
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