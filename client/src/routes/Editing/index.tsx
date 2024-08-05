// Toast Noti
import { ToastContainer } from "react-toastify";
import {showErrorToast, showSuccessToast, showSaveToast } from "../../foundation/utils/ToastMessage.tsx"
import "react-toastify/dist/ReactToastify.css";

// Custom Hooks 
import useKeyPress from "../../hooks/useKeyPress.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";

// Components
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";
import InfoBox from "../../components/InfoBox";
import ShareModal from "../../components/ShareModal"

// Utils & Apis
import { useEffect, useState } from "react";
import { ClassNames } from "../../foundation/utils/ClassNames.tsx";
import { useProjectContext } from "../../context/ProjectContext.tsx"
import { useAuthContext } from "../../context/AuthContext.tsx";
import { useSocketContext } from "../../context/SocketContext.tsx";
import {SubmissionAPI, CheckStatusAPI, SaveDocsAPI} from "../../foundation/compileAPI/index.tsx"

export default function Editing(): JSX.Element  {
	const socket = useSocketContext();
	const project = useProjectContext();
	const user = useAuthContext();

	const [code, setCode] = useState(project.code);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
	const [showModal, setShowModal] = useState(false);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleSubmission();
    }
	}, [ctrlPress, enterPress]);

	
	const debouncedRequest = useDebounce(async () => {
    // send request to the backend and access to latest state here
		showSaveToast(SaveDocsAPI(project._id, code));
	});
	
	const onChange = (data: string) => {
		setCode(data);
		socket!.emit("newEdit", user._id, data);
		debouncedRequest();
		return;
  };
	
	const handleSubmission = async () => {
		setProcessing(true);
		try {
			await SaveDocsAPI(project._id, code);
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

	const handleShowModal = (status: boolean) => {
		if (status) {
			setShowModal(true)
			document.body.style.overflow = 'hidden';
			return;
		}
		setShowModal(false)
		document.body.style.overflow = 'unset';
	}
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
			/>
			
			{/* Info Box */}
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <InfoBox content={project.title}  />
				</div>
				{project.owner._id === user._id &&
					<button className="px-4 py-2" onClick={() => handleShowModal(true)}>
						<InfoBox content={"Share"}  />
					</button>
				}
			</div>
			
			{/* Code window and output */}
      <div className="flex flex-row space-x-4 items-start px-4 py-3">
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
								"mt-4 border-2 border-black text-black font-normal rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
								!code ? "opacity-50" : ""
							)}
						>
							{processing ? "Processing..." : "Compile and Execute"}
					</button>
					{outputDetails && <OutputDetails outputDetails={outputDetails} />}	
				</div>
			</div>
			
			{showModal && <ShareModal onSelect={(status)=>handleShowModal(status)} />}
    </>
  );
};
