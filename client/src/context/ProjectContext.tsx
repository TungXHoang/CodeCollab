import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IProject } from "../components/ProjectsList/IProject"
import {useGetGuests} from "../hooks/useGetGuests.tsx"
import Axios from "axios";
import { useAuthContext } from "./AuthContext";
interface ProjectContextProps {
	children: ReactNode;
}

// Create the context with the appropriate default value and type
export const ProjectContext = createContext<IProject>({
	_id: "",
  title: "",
	language: "",
	languageId: 63,
 	owner: {
		email: "",
		firstName: "",
		lastName: "",
		__v: 0,
		_id: "",
	},
  createdAt: "",
  updatedAt: "",
  __v: 0,
	code: "", // Adjust the type if you have a specific type for messages
});

export const useProjectContext = () => {
	return useContext(ProjectContext);
};

export const ProjectContextProvider: React.FC<ProjectContextProps> = ({ children }) => {

	const { projectId } = useParams<{ projectId: string }>();
	const [guestsId, setGuestsId] = useState<string[] | undefined >(undefined)
	const user = useAuthContext();
	const [loadingProject, setLoadingProject] = useState(true)
	
	const [project, setProject] = useState<IProject>();


	// get project info
	useEffect(() => {
		async function getProject() {
			try {
				
				setLoadingProject(true)
				const res = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/projects/single/${projectId}`);
				setProject(res.data);
			} catch (error) {
				console.error('Error fetching project:', error);
			}
			finally {
				setLoadingProject(false)
			}
		}

		if (projectId) {
			getProject();
		}
	}, []);
	



	//custom hook to load guests list
	const { loadingGuests, guestsList } = useGetGuests(projectId!)

	useEffect(() => {
    if (!loadingGuests && guestsList !== undefined) {
      const guestIds = guestsList.map(guest => guest.guestId);
      setGuestsId(guestIds);
    }
  }, [loadingGuests, guestsList]);



	if (guestsId === undefined || loadingProject) {
		return <></>;
	}
	else {
		return (user.auth && ( (user._id === project!.owner._id) || (guestsId.includes(user._id)))) ?
			<ProjectContext.Provider value={project!}>
				{children}
			</ProjectContext.Provider> :
			<Navigate to="/app" replace />;
	}
	
};


