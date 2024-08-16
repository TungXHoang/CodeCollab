import { useOutletContext } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../components/ProjectsList/IProject"
import useGetProjects from "../../hooks/useGetProjects";
import SelectionModal from "../../components/SelectionModal"
import ActionButtonGroup from "../../components/ActionButtonGroup";

export default function Dashboard() {
	const user = useAuthContext()
	type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	const [showModal, setShowModal]: ModalContextType = useOutletContext();
	const [isOwner, setIsOwner] = useState(true)
	const { loading, projects } = useGetProjects(user._id);
	const [projectsList, setProjectsList] = useState<{ owner: IProject[], guest: IProject[] }>({owner:[],guest:[]})

	useEffect(() => {
		if (!loading) {
			setProjectsList(projects);
    }
	}, [loading, projects]);

	const handleCreate = (newProject: IProject) => {
		setProjectsList((prevProjectsList) => ({
			...prevProjectsList,
			owner: [...prevProjectsList.owner, newProject],
	}));
	}
	const handleDelete = (projectId: string) => {
    setProjectsList((prevProjectsList) => ({
        ...prevProjectsList,
        owner: prevProjectsList.owner.filter(project => project._id !== projectId),
    }));
};

	return (
		<>
			<div className="h-screen overflow-hidden bg-[hsl(220,10%,14%)]">
				<main className="flex flex-col p-8">
					<div className="text-white w-full">
						<div> Hello {user.firstName} {user.lastName} </div> 
						<div> This is Dashboard </div>
						<section className="flex flex-col my-10 flex-1">
							<header className="mb-[24px]">	
								<h2 className="text-xl font-medium">My Projects</h2>
							</header>
							<div className="mb-[24px]">
								<ActionButtonGroup onSelect={setIsOwner} />
							</div>
								<ProjectsList projectsList={isOwner ? projectsList.owner : projectsList.guest } onCreate={handleCreate} onDelete={handleDelete} isOwner={isOwner}  />
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