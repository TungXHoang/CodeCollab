import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IProject } from "../components/ProjectsList/IProject"
import { useGetGuests } from "../hooks/useGetGuests.tsx"
import { useGetEditProject } from "../hooks/useGetEditProject.tsx";
import { useAuthContext } from "./AuthContext";

// Create the context with the appropriate default value and type
export const ProjectContext = createContext<{ project: IProject, setProject: React.Dispatch<React.SetStateAction<IProject | undefined>> } | undefined >(undefined);

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
	const [guestsId, setGuestsId] = useState<string[] | undefined>(undefined)
	const [project, setProject] = useState<IProject | undefined>(undefined);


	// custom hook to get Edit Project 
	const { loadingEditProject, editProject } = useGetEditProject(projectId!)
	useEffect(() => {
		if (!loadingEditProject && editProject !== undefined) {
			setProject(editProject);
		}
	}, [loadingEditProject, editProject])

	//custom hook to load guests list
	const { loadingGuests, guestsList } = useGetGuests(projectId!)
	useEffect(() => {
		if (!loadingGuests && guestsList !== undefined) {
			const guestIds = guestsList.map(guest => guest.guestId._id);
			setGuestsId(guestIds);
		}
	}, [loadingGuests, guestsList]);


	if (guestsId === undefined || loadingEditProject || loadingGuests || project === undefined) {
		return <></>
	}
	else {
		return (user.auth && ( (user._id === project.owner._id) || (guestsId.includes(user._id)))) ?
			<ProjectContext.Provider value={{ project, setProject }}>
				{children}
			</ProjectContext.Provider> :
			<Navigate to="/app" replace />;
	}
};


