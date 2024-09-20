import { useOutletContext, useSearchParams,useLocation,useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import { useUserProjectsContext } from "../../context/UserProjectsContext.tsx";

import ProjectsList from "../../components/ProjectsList";
import { IProject } from "../../types/project";
import SelectionModal from "../../components/SelectionModal"
import SwitchViewGroup from "../../components/SwitchViewGroup";
import DashboardActionGroup from "../../components/DashboardActionGroup"
import UndefinedQuery from "../../components/UndefinedQuery";

//Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export default function Dashboard() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const [showModal, setShowModal]: ModalContextType = useOutletContext();
	const [isOwner, setIsOwner] = useState(true)
	let [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q');
	const [searchField, setSearchField] = useState(query || "");
	const { projectsList, handleCreate, handleDelete } = useUserProjectsContext();


	useEffect(() => {
		setSearchField(query || "");
	}, [query])
	

	useEffect(() => {
		if (location.state) {
			handleDelete(location.state.deleteId)
			navigate("/app", { replace: true, state: null }); // clear the state
		}
	}, [location.state]);
	
	const handleChange = (change: string) => {
		setSearchParams({ q: change });
		setSearchField(change);
	}

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
				position="bottom-right"
				hideProgressBar={true}
				newestOnTop={false}		
				closeOnClick
				containerId="DashboardToast"
				style={{ width: 'fit-content', height: 'auto', transform: 'none', left:'auto', right: '1em', bottom:'1em'}}
				limit={1}
			/>
			<div className="flex-auto overflow-y-auto">
				<div className="flex h-full">
					<div className="grow overflow-auto bg-[#0E1525]">
						<main className="flex flex-col p-[32px] min-h-full w-full text-white">
							<header className="mb-[24px] mt-[10px] flex items-center text-[#F5F9FC] gap-[8px]">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
									<path clipRule="evenodd" fillRule="evenodd" d="M4 21.75A2.75 2.75 0 0 1 1.25 19V5A2.75 2.75 0 0 1 4 2.25h5a.75.75 0 0 1 .624.334l1.777 2.666H20A2.75 2.75 0 0 1 22.75 8v1.213c.835.559 1.34 1.56 1.2 2.643l-.98 7.5a2.75 2.75 0 0 1-2.726 2.394H4ZM3.116 4.116A1.25 1.25 0 0 1 4 3.75h4.599l1.777 2.666A.75.75 0 0 0 11 6.75h9A1.25 1.25 0 0 1 21.25 8v.75H5.256a2.75 2.75 0 0 0-2.506 1.617V5c0-.332.132-.65.366-.884ZM4.278 20.25h15.966a1.25 1.25 0 0 0 1.24-1.088l.978-7.5a1.25 1.25 0 0 0-1.24-1.412H5.256a1.25 1.25 0 0 0-1.24 1.088l-.978 7.5a1.25 1.25 0 0 0 1.24 1.412Z"></path>
								</svg>
								<h2 className="font-[600] text-[20px]">All Projects</h2>
								<DashboardActionGroup searchField={searchField} onChange={(change)=>handleChange(change)} onCreate={(newProject:IProject) => handleCreate(newProject)}/>
							</header>
							<div className="mb-[24px]">
								<SwitchViewGroup onSelect={setIsOwner} />
							</div>
							<div className="flex flex-col grow">
								{searchField !== "" && filteredProject[filteredKey].length === 0 ?
									<UndefinedQuery query={searchField} /> :
									<ProjectsList projectsList={isOwner ? filteredProject.owner : filteredProject.guest} isOwner={isOwner} onDelete={handleDelete} onCreate={handleCreate} />
								}

							</div>
							
						</main>
					</div>
				</div>
			</div>
			{showModal &&
				<SelectionModal onSelect={setShowModal}
					onCreate={(newProject:IProject) => handleCreate(newProject)} />
			}
		</>
	)
}