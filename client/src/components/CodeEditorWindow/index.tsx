import { useState } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ICodeEditorWindow } from "./ICodeEditorWindow";
import { useProjectContext } from "../../context/ProjectContext"
import { useAuthContext } from "../../context/AuthContext";
import {useYjs} from "../../hooks/useYjs"


const CodeEditorWindow = ({ onEdit, language}:ICodeEditorWindow) => {
	const project = useProjectContext();
	const user = useAuthContext();
	const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor | null>(null);

	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		setEditorRef(editor);
	}
	
	useYjs(editorRef, project._id, user)
	
	const handleEditorChange = () => {
		if (editorRef){
			onEdit(editorRef.getValue());
		}
	}

	return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language}
        theme="vs-dark"
				onChange={handleEditorChange}
				onMount = {handleEditorDidMount}
      />
    </div>
  );
};
export default CodeEditorWindow;