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

async function SaveDocsAPI(projectId: string, doc: string) {
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/docs/save`, { doc, projectId });
	return response.data;
	
}
export {SubmissionAPI, CheckStatusAPI, SaveDocsAPI}