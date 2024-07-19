import { useEffect, useState } from "react";
import Axios from "axios"
import {IProject } from "../components/ProjectsList/IProject"

const useGetSnippets = (projectId: string) => {
	const [loading, setLoading] = useState(false);
	const [snippet, setSnippet] = useState<IProject[]>([]);

	useEffect(() => {
		const getProjects = async () => {
			setLoading(true);
			try {
				const res = await Axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/docs`, { projectId });
				console.log(res.data);
				setSnippet(res.data);
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false);
			}
		};
		getProjects();
	}, []);

	return { loading, snippet };
};
export default useGetSnippets;
