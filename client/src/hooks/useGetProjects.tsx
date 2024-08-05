import { useEffect, useState } from "react";
import Axios from "axios"
import {IProject } from "../components/ProjectsList/IProject"

interface IAllProjects {
	owner: IProject[],
	guest: IProject[],
} 

const useGetProjects = (userId: string) => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState<IAllProjects>({ owner: [], guest: [] });

	useEffect(() => {
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
	}, []);
	
	return { loading, projects };
};
export default useGetProjects;
