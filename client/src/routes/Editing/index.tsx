// Toast Noti
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Custom Hooks 
import useDebounce from "../../hooks/useDebounce.tsx";

// Components
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";

// Utils & Apis
import { useProjectContext } from "../../context/ProjectContext.tsx"
import {SaveDocsAPI} from "../../foundation/compileAPI/index.tsx"
import { useEditNavbar } from "../../components/EditingNavbar";


export default function Editing(): JSX.Element {
	const {project} = useProjectContext();

	const { outputDetails, setCode } = useEditNavbar();

	
	const debouncedRequest = useDebounce(async () => {
		await SaveDocsAPI(project._id);
		// showSaveToast(SaveDocsAPI(project._id));
	});
	
	const onChange = (data: string) => {
		setCode(data);
		debouncedRequest();
	};

	
	return (
		<>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				containerId="EditingToast"
				style={{ width: 'fit-content', height: 'auto', transform: 'none', left:'auto', right: '1em', bottom:'1em' }}
				limit={1}
				// transition={Slide}
			/>
			{/* Code window and output */}
			<div className="flex flex-row space-x-4 items-start px-4 py-3 mt-8">
				<div className="flex flex-col w-full h-full justify-start items-end">
					<CodeEditorWindow
						onEdit={onChange}
						language={project.language}
					/>
				</div>

				<div className="right-container flex flex-shrink-0 w-[30%] flex-col">
					<OutputWindow outputDetails={outputDetails} />
					{/* <button
						onClick={handleSubmission}
						disabled={processing}
						className={ClassNames(
							"mt-4 border-2 border-black text-black font-normal rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
							!code ? "opacity-50" : ""
						)}
					>
						{processing ? "Processing..." : "Compile and Execute"}
					</button> */}
					{outputDetails && <OutputDetails outputDetails={outputDetails} />}
				</div>
			</div>
		</>
	);
};
