import { useEffect, useState, useContext } from "react";
import { ClassNames } from "../../foundation/utils/ClassNames.tsx";
import { languageOptions } from "../../foundation/constants/languageOptions.tsx";
import { ToastContainer } from "react-toastify";
import {showErrorToast, showSuccessToast } from "../../foundation/utils/ToastMessage.tsx"
import "react-toastify/dist/ReactToastify.css";
import {ProjectContext} from "../../context/ProjectContext.tsx"
import useKeyPress from "../../hooks/useKeyPress.tsx";
import CodeEditorWindow from "../../components/CodeEditorWindow/index.tsx";
import OutputWindow from "../../components/OutputWindow/index.tsx";
import OutputDetails from "../../components/OutputDetails/index.tsx";
// import LanguagesDropdown from "../../components/LanguagesDropdown/index.tsx";
// import { ILanguage } from "../../components/LanguagesDropdown/ILanguagesDropdown.tsx"; 
import { codeSnippets } from "../../foundation/constants/codeSnippets.tsx"
import {SubmissionAPI, CheckStatusAPI} from "../../foundation/compileAPI/index.tsx"



export default function Editing(): JSX.Element  {
	const project = useContext(ProjectContext)
	// const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState(codeSnippets[project.language as keyof typeof codeSnippets]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);


	console.log(project);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  // const onSelectChange = (sl: ILanguage) => {
  //   setLanguage(sl);
  // };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleSubmission();
    }
	}, [ctrlPress, enterPress]);
	
  const onChange = ( data: string) => {
		setCode(data);
		return;
  };

	
	const handleSubmission = async () => {
		setProcessing(true);
		try {
			const token: string = await SubmissionAPI(project.languageId, code);
			const response = await CheckStatusAPI(token);
			setProcessing(false)
			setOutputDetails(response)
			if (response.status_id == 3) {
				showSuccessToast(`Compiled Successfully!`)
			}
			else {
				showErrorToast(response.status.description);
			}
			return;
		}
		catch(err) {
			console.log("err", err);
			showErrorToast(err as string);
		}
		finally {
			setProcessing(false);
		}
	}

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
			</div> */}
			
			{/* Code window and output */}
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
				<div className="flex flex-col w-full h-full justify-start items-end">
					<CodeEditorWindow
            code={code}
            onEdit={onChange}
            language={project.language}
          />
        </div>

				<div className="right-container flex flex-shrink-0 w-[30%] flex-col">
					<OutputWindow outputDetails={outputDetails} />
					<button
							onClick = {handleSubmission}
							disabled={processing}
							className={ClassNames(
								"mt-4 border-2 border-black z-10 font-normal rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
								!code ? "opacity-50" : ""
							)}
						>
							{processing ? "Processing..." : "Compile and Execute"}
					</button>
					{outputDetails && <OutputDetails outputDetails={outputDetails} />}	
				</div>
      </div>
    </>
  );
};
