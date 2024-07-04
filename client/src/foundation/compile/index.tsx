import Axios from "axios";
import { ILanguage } from "../../components/LanguagesDropdown/ILanguagesDropdown.tsx"; 

async function SubmissionAPI(language: ILanguage, code: string) {
	const response = await Axios.post("/api/compiler/submit", {language,code});
	return response;
}
async function CheckStatusAPI(token: string) {
	const response = await Axios.post("/api/compiler/status", { token });
	return response.data;
}

export {SubmissionAPI, CheckStatusAPI}