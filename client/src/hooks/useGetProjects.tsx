import { useEffect, useState } from "react";
import Axios from "axios"
import { IProject } from "../types/project";

interface IAllProjects {
	owner: IProject[],
	guest: IProject[],
} 

const useGetProjects = (userId: string | undefined) => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState<IAllProjects | undefined>(undefined);

	useEffect(() => {
		if (!userId) {
      setLoading(false);
      setProjects(undefined);
      return; 
    }
		const getProjects = async () => {
			setLoading(true);
			try {
				const res = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/${userId}`);
				setProjects(res.data);
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false); 
			}
		};
		getProjects();
	}, [userId]);
	
	return { loading, projects };
};
export default useGetProjects;
