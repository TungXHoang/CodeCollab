import { useEffect, useState } from "react";
import Axios from "axios"
import {IProject } from "../components/ProjectsList/IProject"

const useGetProjects = () => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState<IProject[]>([]);

	useEffect(() => {
		const getProjects = async () => {
			setLoading(true);
			try {
				const res = await Axios.get("/api/projects");
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
