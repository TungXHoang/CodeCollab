import { useState, useRef, useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ICodeEditorWindow } from "./ICodeEditorWindow";
import { useProjectContext } from "../../context/ProjectContext"
import { useAuthContext } from "../../context/AuthContext";

const serverWsUrl = "ws://localhost:3000";

const CodeEditorWindow = ({ onEdit, language, code }:ICodeEditorWindow) => {
	const project = useProjectContext();
	const user = useAuthContext();
	// const [value, setValue] = useState(code || "");
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
		const doc = new Y.Doc();
		const type = doc.getText('monaco')
		const provider = new WebsocketProvider(
			serverWsUrl, // use the public ws server
			project._id,
			doc
		);
		const awareness = provider.awareness
		// You can observe when a user updates their awareness information
		
		// flag to prevent initial update when mount
		let isInitialMount = true;
		// You can observe when a user updates their awareness information
	// 	awareness.on('change', (changes: any) => {
	// 		if (!isInitialMount) {	
	// 			onEdit(editor.getValue());
	// 		} else {
	// 			isInitialMount = false;
	// 		}
	// });

		awareness.setLocalStateField('user', {
			name: user.firstName + user.lastName,
			id: user._id,
			color: '#ffb61e' // should be a hex color
		})
		
		const monacoBinding = new MonacoBinding(type, editorRef.current.getModel()!, new Set([editorRef.current]), awareness)
		console.log(monacoBinding, provider);
		return () => {
			if (provider) {
				awareness.destroy();
				provider.disconnect(); //We destroy doc we created and disconnect 
				doc.destroy();  //the provider to stop propagting changes if user leaves editor
			}
		};
	}
	
	const handleEditorChange = () => {
		if (editorRef){
			onEdit(editorRef!.current!.getValue());
		}
	}

	return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language}
        theme="vs-dark"
        defaultValue="// some comment"
				onChange={handleEditorChange}
				onMount = {handleEditorDidMount}
      />
    </div>
  );
};
export default CodeEditorWindow;