import { useEffect, useState } from "react";
import Axios from "axios"

const useGetProjects = () => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const getProjects = async () => {
			setLoading(true);
			try {
				const res = await Axios.get("/api/projects");
				// console.log(res.data);
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
