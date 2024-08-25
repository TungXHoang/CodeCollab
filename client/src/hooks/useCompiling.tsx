import { SubmissionAPI, CheckStatusAPI, SaveDocsAPI } from "../foundation/compileAPI/index.tsx"
import { showErrorToast, showSuccessToast } from "../foundation/utils/ToastMessage.tsx"
import { IProject } from "../components/ProjectsList/IProject.tsx";

import { useState } from 'react';

interface IUseCompiling {
	project: IProject;
	code: string
}
const useCompiling = ({project, code}:IUseCompiling) => {
	const [outputDetails, setOutputDetails] = useState<string | null>(null);
	const [processing, setProcessing] = useState(false);

	const handleSubmission = async () => {
		setProcessing(true);
		try {
			await SaveDocsAPI(project._id);
			const token: string = await SubmissionAPI(project.languageId, code);
			const response = await CheckStatusAPI(token);
			setProcessing(false)
			setOutputDetails(response)
			if (response.status_id == 3) {
				showSuccessToast(`Compiled Successfully!`, {containerId: 'EditingToast'})
			}
			else {
				showErrorToast(response.status.description, {containerId: 'EditingToast'});
			}
			return;
		}
		catch (err) {
			console.log("err", err);
			showErrorToast(err as string, {containerId: 'EditingToast'});
		}
		finally {
			setProcessing(false);
		}
	}

	return {processing, outputDetails, handleSubmission}
}

export default useCompiling