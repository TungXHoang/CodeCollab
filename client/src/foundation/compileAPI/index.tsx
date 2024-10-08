import Axios from "axios"; 

async function SubmissionAPI(languageId: number, code: string) {
	// get the token of the submission from server
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/compiler/submit`, {languageId,code});
	return response.data.token;
}
async function CheckStatusAPI(token: string) {
	// retrieve status of compiler with given token 
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/compiler/status`, { token });
	return response.data;
}

// only use to update Last Update field, actually docs is updated by YJS
async function SaveDocsAPI(projectId: string) {
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/docs/save`, { projectId });
	return response.data;
	
}
export {SubmissionAPI, CheckStatusAPI, SaveDocsAPI}