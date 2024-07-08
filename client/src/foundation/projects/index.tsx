import Axios from "axios"

async function createProject(formData: FormData) {
	const res = await Axios.post("/api/projects", formData);
	console.log(res);
	return res;
}

export {createProject}