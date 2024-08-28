import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProject } from "../components/ProjectsList/IProject.tsx";
import { useAuthContext } from "./AuthContext.tsx";
import useGetProjects from "../hooks/useGetProjects";
import { showDashboardToast } from "../foundation/utils/ToastMessage.tsx";

interface IUserProjectsContext {
  projectsList: { owner: IProject[], guest: IProject[] };
	setProjectsList: React.Dispatch<React.SetStateAction<{ owner: IProject[], guest: IProject[] } | undefined>>;
	handleCreate: (newProject: IProject) => void;
	handleDelete: (projectsId: string[]) => void;
}

export const UserProjectsContext = createContext<IUserProjectsContext | undefined>(undefined);

export const useUserProjectsContext = () => {
  const context = useContext(UserProjectsContext);
  if (context === undefined) {
    throw new Error("useUserProjectsContext must be used within a UserProjectsContextProvider");
  }
  return context;
};

export const UserProjectsContextProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthContext();
  const { loading, projects } = useGetProjects(user._id);
  const [projectsList, setProjectsList] = useState<{ owner: IProject[], guest: IProject[] } | undefined>(undefined);
	

  useEffect(() => {
    if (!loading && projects) {
      setProjectsList(projects);
    }
  }, [loading, projects]);



	const handleCreate = (newProject: IProject) => {
		showDashboardToast("Project created successfully!", "success");
		setProjectsList((prevProjectsList) => {
			if (prevProjectsList) {
				return {
					...prevProjectsList,
					owner: [newProject, ...prevProjectsList.owner],
				};
			} else {
				return {
					owner: [newProject],
					guest: [],
				};
			}
		});
	}
	
	const handleDelete = (projectIds: string[]) => {
		// console.log('handleDelte context trigger');
		showDashboardToast("Project deleted successfully!", "success");
    setProjectsList((prevProjectsList) => {
			if (prevProjectsList) {
				return {
					...prevProjectsList,
					owner: prevProjectsList.owner.filter(project => !projectIds.includes(project._id)),
				};
			} else {
				return {
					owner: [],
					guest: [],
				};
			}
		});
	};

  if (loading || projectsList === undefined) {
    return <></>;
  }

  return (
    <UserProjectsContext.Provider value={{ projectsList, setProjectsList, handleCreate,handleDelete}}>
      {children}
    </UserProjectsContext.Provider>
  );
};