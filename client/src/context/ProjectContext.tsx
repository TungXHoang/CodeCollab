import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IProject } from "../components/ProjectsList/IProject"
import {useGetGuests} from "../hooks/useGetGuests.tsx"
import Axios from "axios";
import { useAuthContext } from "./AuthContext";

// Create the context with the appropriate default value and type
export const ProjectContext = createContext<IProject | undefined >(undefined);

export const useProjectContext = () => {
	const context = useContext(ProjectContext);
	if (context === undefined) {
    throw new Error("useProjectContext must not be undefined");
  }
  return context;
};

export const ProjectContextProvider = ({ children }: { children: ReactNode}) => {
	const user = useAuthContext();
	const { projectId } = useParams<{ projectId: string }>();

	const [guestsId, setGuestsId] = useState<string[] | undefined >(undefined)
	const [project, setProject] = useState<IProject | undefined >(undefined);
	const [loadingProject, setLoadingProject] = useState(false);

	// get project info; migrate this to hooks
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


