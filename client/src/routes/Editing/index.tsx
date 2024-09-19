// Toast Noti
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Custom Hooks 

//Reacthook
import { useState } from 'react';
import { editor } from "monaco-editor";
// Components
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";
import ResizableHandle from "./ResizableHandle.tsx"
// Utils & Apis
import { useProjectContext } from "../../context/ProjectContext.tsx"
import {useAuthContext} from "../../context/AuthContext.tsx"
import { useEditNavbar } from "../../components/EditingNavbar";
import { Resizable } from 're-resizable';


export default function Editing(): JSX.Element {
	const {user} = useAuthContext();
	const { project } = useProjectContext();
	const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor | null>(null);
	const { outputDetails } = useEditNavbar();


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
				{/* <Resizable
					defaultSize={{
						height: `100%`,
						width: "20%"
					}}
					// minWidth={180}
					handleStyles={{ right: { right: "-2px"}}}
					handleComponent={{right: <ResizableHandle/>}}
					enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
				>
					<FileTree project={project} editorRef={editorRef}/>
				</Resizable> */}
				<div className="flex z-20 relative h-full w-full mt-2 overflow-hidden">
					<Resizable
						defaultSize={{
							height: `100%`,
							width: "60%"
						}}
						handleComponent={{ right: <ResizableHandle /> }}
						handleStyles={{ right: { right: "-12px"} }}
						style={{ marginRight: "6px", userSelect:"none" }}
						enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}>
						<CodeEditorWindow
							user={user}
							project={project}
							editorRef={editorRef}
							setEditorRef={setEditorRef}
							language={project.language}
						/>
					</Resizable>
				
					<div className="flex flex-col w-full ml-1 h-full">
						<OutputWindow outputDetails={outputDetails} />
						{outputDetails && <OutputDetails outputDetails={outputDetails} />}
					</div>

					
				</div>
				
				
			</div>
		</>
	);
};
