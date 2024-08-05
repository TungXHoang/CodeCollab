import Axios, { AxiosError,AxiosResponse } from "axios"

interface IShareProject {
	projectId: string,
	ownerId: string,
	guestEmail: string
}

async function createProject(formData: FormData) {
	const res = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, formData);
	return res;
}

async function deleteProject(formData: any) {
	const res = await Axios.delete(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, {
		headers: {
			Authorization: formData.userId
		},
		data: formData
	});
	return res;
}


async function shareProject(formData: IShareProject) {
	try {
		const res: AxiosResponse = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/share`, formData);
		return res;
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
	
}
export {createProject, deleteProject, shareProject}