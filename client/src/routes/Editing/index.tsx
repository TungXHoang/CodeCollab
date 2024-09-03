// Toast Noti
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Custom Hooks 
import useDebounce from "../../hooks/useDebounce.tsx";

// Components
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";
import FileTree from "../../components/FileTree";
import ResizableHandle from "./ResizableHandle.tsx"
// Utils & Apis
import { useProjectContext } from "../../context/ProjectContext.tsx"
import {SaveDocsAPI} from "../../foundation/compileAPI/index.tsx"
import { useEditNavbar } from "../../components/EditingNavbar";
import { Resizable } from 're-resizable';

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
			/>
			{/* Code window and output */}
			<div className="flex z-20 relative h-full bg-[#0e1525] pb-[4%]">
				<Resizable
					defaultSize={{
						height: `100%`,
						width: "20%"
					}}
					// minWidth={180}
					handleStyles={{ right: { right: "-2px"}}}
					style={{}}
					handleComponent={{right: <ResizableHandle/>}}
					enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
				>
					<FileTree/>
				</Resizable>
				<Resizable
					defaultSize={{
						height: `100%`,
						width: "45%"
					}}

					handleComponent={{ right: <ResizableHandle /> }}
					handleStyles={{ right: { right: "-10px"} }}
					style={{ marginRight: "6px", userSelect:"none" }}
					enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
				>
					<CodeEditorWindow
						onEdit={onChange}
						language={project.language}
					/>
		
				</Resizable>
				
				<div className="flex flex-col w-[35%]">
					<OutputWindow outputDetails={outputDetails} />
					{outputDetails && <OutputDetails outputDetails={outputDetails} />}
				</div>
				
			</div>
		</>
	);
};
