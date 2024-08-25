// Toast Noti
import { ToastContainer } from "react-toastify";
import {showSaveToast } from "../../foundation/utils/ToastMessage.tsx"
import "react-toastify/dist/ReactToastify.css";


// Custom Hooks 
import useKeyPress from "../../hooks/useKeyPress.tsx";
import useDebounce from "../../hooks/useDebounce.tsx";

// Components
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";
import InfoBox from "../../components/InfoBox";


// Utils & Apis
import { useEffect, useState } from "react";
import { ClassNames } from "../../foundation/utils/ClassNames.tsx";
import { useProjectContext } from "../../context/ProjectContext.tsx"
import {SaveDocsAPI} from "../../foundation/compileAPI/index.tsx"
import useCompiling from "../../hooks/useCompiling.tsx";


export default function Editing(): JSX.Element {
	const project = useProjectContext();

	const [code, setCode] = useState<string>("");

	const { outputDetails, processing, handleSubmission } = useCompiling({project:project, code:code});

	const enterPress = useKeyPress("Enter");
	const ctrlPress = useKeyPress("Control");

	useEffect(() => {
		if (enterPress && ctrlPress) {
			handleSubmission();
		}
	}, [ctrlPress, enterPress]);
	
	const debouncedRequest = useDebounce(async () => {
		showSaveToast(SaveDocsAPI(project._id));
	});
	
	const onChange = (data: string) => {
		setCode(data);
		debouncedRequest();
	};

	
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				containerId = "EditingToast"
			/>
			
			{/* Info Box */}
			<div className="flex flex-row">
				<div className="px-4 py-2">
					<InfoBox content={project.title} />
				</div>
			</div>
			
			{/* Code window and output */}
			<div className="flex flex-row space-x-4 items-start px-4 py-3">
				<div className="flex flex-col w-full h-full justify-start items-end">
					<CodeEditorWindow
						onEdit={onChange}
						language={project.language}
					/>
				</div>

				<div className="right-container flex flex-shrink-0 w-[30%] flex-col">
					<OutputWindow outputDetails={outputDetails} />
					<button
						onClick={handleSubmission}
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
		</>
	);
};
