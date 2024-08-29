import { useState } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ICodeEditorWindow } from "./ICodeEditorWindow";
import { useProjectContext } from "../../context/ProjectContext"
import { useAuthContext } from "../../context/AuthContext";
import {useYjs} from "../../hooks/useYjs"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const CodeEditorWindow = ({ onEdit, language}:ICodeEditorWindow) => {
	const {project} = useProjectContext();
	const user = useAuthContext();
	const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor | null>(null);
	const [isEditorMounted, setIsEditorMounted] = useState(false);

	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		setEditorRef(editor);
		setIsEditorMounted(true); // Editor has mounted, stop showing loader
	};
	
	useYjs(editorRef, project._id, user)
	
	const handleEditorChange = () => {
		if (editorRef){
			onEdit(editorRef.getValue());
		}
	}

	return (
		<div className="overlay relative rounded-md overflow-hidden w-full h-full shadow-4xl">
      {!isEditorMounted && (
        <div className="absolute inset-0 z-10">
					<Skeleton
						height="85vh"
						width="100%"
						baseColor="#1e1e1e"
						borderRadius="0.5rem"
						duration={0} />
        </div>
      )}
      <Editor
        height="85vh"
        width="100%"
        language={language}
        theme="vs-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={null}
      />
    </div>
  );
};
export default CodeEditorWindow;