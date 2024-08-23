import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../components/ProjectsList/IProject"
import useGetProjects from "../../hooks/useGetProjects";
import SelectionModal from "../../components/SelectionModal"
import ActionButtonGroup from "../../components/ActionButtonGroup";
import HeaderAction from "../../components/HeaderAction"
import Loading from "../../foundation/utils/Loading";

//Toast
import { ToastContainer } from "react-toastify";
import {showDashboardToast } from "../../foundation/utils/ToastMessage.tsx"
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
	const user = useAuthContext()
	type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	const [showModal, setShowModal]: ModalContextType = useOutletContext();
	const [isOwner, setIsOwner] = useState(true)
	const { loading, projects } = useGetProjects(user._id);
	const [projectsList, setProjectsList] = useState<{ owner: IProject[], guest: IProject[] }>({ owner: [], guest: [] })
	
	let [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q');
	const [searchField, setSearchField] = useState(query || "");


	useEffect(() => {
		setSearchField(query || "");
	}, [query])
	
	
	useEffect(() => {
		if (!loading) {
			setProjectsList(projects);
    }
	}, [loading, projects]);


	const handleChange = (change: string) => {
		setSearchParams({ q: change });
		setSearchField(change);
	}

	const handleCreate = (newProject: IProject) => {
		showDashboardToast("Project created successfully!", "success");
		setProjectsList((prevProjectsList) => ({
		...prevProjectsList,
		owner: [newProject, ...prevProjectsList.owner],
		}));
	}
	
	const handleDelete = (projectId: string) => {
		showDashboardToast("Project deleted successfully!", "success");
    setProjectsList((prevProjectsList) => ({
			...prevProjectsList,
			owner: prevProjectsList.owner.filter(project => project._id !== projectId),
    }));
	};

	
	const filteredKey = isOwner ? 'owner' : 'guest';
	const filteredProject = {
		...projectsList,
		[filteredKey]: projectsList[filteredKey].filter(project =>
			project.title.toLowerCase().includes(searchField.toLowerCase()) ||
			project.description.toLowerCase().includes(searchField.toLowerCase())
		)
	};
	

	return (
		<>
			<ToastContainer
				position="bottom-center"
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				containerId="DashboardToast"
			/>
			<div className="h-screen overflow-hidden bg-[hsl(220,10%,14%)]">
				<main className="flex flex-col p-8">
					<div className="w-full text-white">
						<section className="flex flex-col my-10 flex-1  p-[32px] pl-[10px] pt-0">
							<header className="mb-[24px] flex items-center">	
								<h2 className="font-[600] text-[20px] text-[hsl(0,0%,94%)]">My Projects</h2>
								<HeaderAction searchField={searchField} onChange={(change)=>handleChange(change)} onCreate={handleCreate}/>
							</header>
							<div className="mb-[24px]">
								<ActionButtonGroup onSelect={setIsOwner} />
							</div>
							{loading ? <Loading /> : <ProjectsList projectsList={isOwner ? filteredProject.owner : filteredProject.guest} onCreate={handleCreate} onDelete={handleDelete} isOwner={isOwner} />}
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