import Axios, { AxiosError,AxiosResponse } from "axios"

interface shareProjectCredential {
	projectId: string,
	ownerId: string,
	guestEmail: string
}

async function createProject(formData: FormData) {
	const res = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, formData);
	return res;
}

async function deleteProject({userId, projectsId}:{userId:string,projectsId:string[]}) {
	const res = await Axios.delete(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, {
		headers: {
			Authorization: userId
		},
		data: {userId,projectsId}
	});
	return res;
}


async function shareProject(shareProjectCredential: shareProjectCredential) {
	try {
		const res: AxiosResponse = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/share`, shareProjectCredential);
		return res;
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
	
}

async function deleteGuest({userId, guestId, projectId}:{userId:string, guestId:string,projectId:string}) {
	try {
		const res: AxiosResponse = await Axios.delete(`${import.meta.env.VITE_CLIENT_BASEURL}/api/guests/${projectId}`, {
			headers: {
				Authorization: userId
			},
			data: {guestId, projectId}
		});
		return res;
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
}

async function updateProject({ userId, projectId, newTitle, newDescription }: { userId: string, projectId: string, newTitle:string,newDescription:string})  {
	try {
		const res: AxiosResponse = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/update`, { userId, projectId, newTitle, newDescription })
		return res
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
}

async function saveProject({ docName }: { docName: string }) {
	try {
		const res: AxiosResponse = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/save`, {docName})
		if (res) {
			console.log(res);
		}
		return res
	}
	catch (err) {
		console.log(err);
		return (err as AxiosError).response;
	}
}
export {saveProject,createProject, deleteProject, shareProject, deleteGuest, updateProject}