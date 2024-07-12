import Axios from "axios"

async function createProject(formData: FormData) {
	const res = await Axios.post("/api/projects", formData);
	return res;
}

async function deleteProject(formData: any) {
	const res = await Axios.delete("/api/projects", {
		headers: {
			Authorization: formData.userId
		},
		data: formData
	});
	return res;
}
export {createProject, deleteProject}