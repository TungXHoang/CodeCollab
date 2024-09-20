import { useEffect, useState } from "react";
import Axios from "axios"
import { IProject } from "../types/project";


const useGetEditProject = (projectId: string) => {
	const [loadingEditProject, setLoadingEditProject] = useState(false);
	const [editProject, setEditProject] = useState<IProject | undefined>( undefined);

	useEffect(() => {
		async function getEditProject() {
			try {
				setLoadingEditProject(true)
				const res = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/single/${projectId}`);
				setEditProject(res.data);
			} catch (error) {
				console.error('Error fetching project:', error);
			}
			finally {
				setLoadingEditProject(false)
			}
		}

		getEditProject()
	}, []);
	
	
	return { loadingEditProject, editProject };
};
export {useGetEditProject};
