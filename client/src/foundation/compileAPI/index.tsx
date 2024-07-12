import Axios from "axios";
import { ILanguage } from "../../components/LanguagesDropdown/ILanguagesDropdown.tsx"; 

async function SubmissionAPI(language: ILanguage, code: string) {
	// get the token of the submission from server
	const response = await Axios.post("/api/compiler/submit", {language,code});
	return response.data.token;
}
async function CheckStatusAPI(token: string) {
	// retrieve status of compiler with given token 
	const response = await Axios.post("/api/compiler/status", { token });
	return response.data;
}

export {SubmissionAPI, CheckStatusAPI}