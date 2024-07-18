import Axios, { AxiosError } from "axios"

interface IShareProject {
	projectId: string,
	ownerId: string,
	guestEmail: string
}

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


async function shareProject(formData: IShareProject) {
	try {
		const res = await Axios.post("/api/projects/share", formData);
		return res.status;
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
	
}
export {createProject, deleteProject, shareProject}