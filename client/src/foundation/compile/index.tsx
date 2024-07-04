import Axios from "axios";
import { ILanguage } from "../../components/LanguagesDropdown/ILanguagesDropdown.tsx"; 

async function SubmissionAPI(language: ILanguage, code: string) {
	const response = await Axios.post("/api/compiler/submit", {language,code});
	console.log(response);
	return;
}

export {SubmissionAPI}