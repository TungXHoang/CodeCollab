import Axios, { AxiosResponse } from "axios"

import * as IProject from "./IProjectsAPI";
import { showToast } from "../../foundation/utils/ToastMessage.tsx"

const getContainerId = () => {
	const location = window.location.pathname;
	switch (true) {
		case location === "/app":
			return "DashboardToast";
		case location.startsWith("/user/"):
			return "UserProfileToast";
		case location.startsWith("/edit"):
			return "EditingToast";
		default:
			return "DashboardToast";
	}
};


async function createProject(createProjectParams: IProject.ICreateProjectParams) {
	try {
		
		const res: AxiosResponse<IProject.ICreateProjectResponse, IProject.ICreateProjectParams> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, createProjectParams);
		showToast("success", "Project created successfully", { containerId: getContainerId() })
		const result = res.data
		return result;
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: getContainerId() })
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function deleteProject(formData: { userId: string, projectsId: string[] }) {
	try {
		const res: AxiosResponse<{message:string},{ userId: string, projectsId: string[]}> = await Axios.delete(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects`, {
			headers: { Authorization: formData.userId},
			data: formData
		});
		const msg = formData.projectsId.length > 1 ? `${formData.projectsId.length} projects have been deleted!` : "Project deleted successfully!"
		showToast("success", msg, { containerId: getContainerId() });
		const result = res.data;
		return result;
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error","Delete project fail!", {containerId: getContainerId()})
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
	
}


async function shareProject(shareProjectParams: IProject.IShareProjectParams) {
	try {
		const res: AxiosResponse<IProject.IShareProjectResponse,IProject.IShareProjectParams> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/share`,shareProjectParams);
		showToast("success", res.data.message, { containerId: getContainerId() })
		const result = res.data;
		return result;
	} catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: getContainerId() })
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function deleteGuest({userId, guestId, projectId}:IProject.IDeleteGuestParams) {
	try {
		const res: AxiosResponse<IProject.IDeleteGuestResponse,IProject.IDeleteGuestResponse> = await Axios.delete(`${import.meta.env.VITE_CLIENT_BASEURL}/api/guests/${projectId}`, {
			headers: {Authorization: userId},
			data: {guestId, projectId}
		});
		showToast('success', "Remove guest successfully!", { containerId: getContainerId() })
		const result = res.data;
		return result;
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast('error', "Guest deleted unsuccessfully!", { containerId: getContainerId() })
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function updateProject({ userId, projectId, newTitle, newDescription }: IProject.IUpdateProjectParams)  {
	try {
		const res: AxiosResponse<IProject.IUpdateProjectResponse,IProject.IUpdateProjectParams> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/update`, { userId, projectId, newTitle, newDescription })
		showToast("success", "Update successfully", { containerId: getContainerId() });
		const result = res.data;
		return result
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", "Update fail!", { containerId: getContainerId() });
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function saveProject({ docName }: { docName: string }) {
	try {
		const res: AxiosResponse<{message:string},{docName:string}> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/projects/save`, {docName})
		const result = res.data;
		// handle toast noti at UI layer
		return result;
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", "Save fail!", { containerId: getContainerId() });
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}
export {saveProject,createProject, deleteProject, shareProject, deleteGuest, updateProject}