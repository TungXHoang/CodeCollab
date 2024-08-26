import { useOutletContext, useSearchParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../components/ProjectsList/IProject"
import useGetProjects from "../../hooks/useGetProjects";
import SelectionModal from "../../components/SelectionModal"
import SwitchViewGroup from "../../components/SwitchViewGroup";
import DashboardActionGroup from "../../components/DashboardActionGroup"
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
		// showDashboardToast("Project deleted successfully!", "success");
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
			<div className="h-screen overflow-hidden bg-[#0E1525]">
				<main className="flex flex-col p-8">
					<div className="w-full text-white">
						<section className="flex flex-col my-10 flex-1 justify-center p-[32px] pl-[10px] pt-0">
							<header className="mb-[24px] flex items-center text-[#F5F9FC] gap-[8px]">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
									<path clipRule="evenodd" fillRule="evenodd" d="M4 21.75A2.75 2.75 0 0 1 1.25 19V5A2.75 2.75 0 0 1 4 2.25h5a.75.75 0 0 1 .624.334l1.777 2.666H20A2.75 2.75 0 0 1 22.75 8v1.213c.835.559 1.34 1.56 1.2 2.643l-.98 7.5a2.75 2.75 0 0 1-2.726 2.394H4ZM3.116 4.116A1.25 1.25 0 0 1 4 3.75h4.599l1.777 2.666A.75.75 0 0 0 11 6.75h9A1.25 1.25 0 0 1 21.25 8v.75H5.256a2.75 2.75 0 0 0-2.506 1.617V5c0-.332.132-.65.366-.884ZM4.278 20.25h15.966a1.25 1.25 0 0 0 1.24-1.088l.978-7.5a1.25 1.25 0 0 0-1.24-1.412H5.256a1.25 1.25 0 0 0-1.24 1.088l-.978 7.5a1.25 1.25 0 0 0 1.24 1.412Z"></path>
								</svg>
								<h2 className="font-[600] text-[20px]">All Projects</h2>
								<DashboardActionGroup searchField={searchField} onChange={(change)=>handleChange(change)} onCreate={handleCreate}/>
							</header>
							<div className="mb-[24px]">
								<SwitchViewGroup onSelect={setIsOwner} />
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