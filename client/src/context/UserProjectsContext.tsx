import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProject } from "../types/project";
import { useAuthContext } from "./AuthContext.tsx";
import useGetProjects from "../hooks/useGetProjects";
import AuthContextSkeleton from "../components/SkeletonComponent/AuthContextSkeleton" 

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
  const {user} = useAuthContext();
  const { loading, projects } = useGetProjects(user._id);
  const [projectsList, setProjectsList] = useState<{ owner: IProject[], guest: IProject[] } | undefined>(undefined);
	

  useEffect(() => {
		if (!loading && projects) {
      setProjectsList(projects);
    }
  }, [loading, projects]);



	const handleCreate = (newProject: IProject) => {
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
		// const msg = projectIds.length > 1 ? `${projectIds.length} projects have been deleted!` : "Project deleted successfully!"
		// showToast("success", msg, {containerId:"DashboardToast"} )
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
    return <AuthContextSkeleton/>
  }

  return (
    <UserProjectsContext.Provider value={{ projectsList, setProjectsList, handleCreate,handleDelete}}>
      {children}
    </UserProjectsContext.Provider>
  );
};