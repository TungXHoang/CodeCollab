import { useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ICodeEditorWindow } from "./ICodeEditorWindow";
import { useProjectContext } from "../../context/ProjectContext"
import { useAuthContext } from "../../context/AuthContext";
import { CursorStyling } from "../../foundation/utils/CursorStyling";

const serverWsUrl = "ws://localhost:3000";

const CodeEditorWindow = ({ onEdit, language}:ICodeEditorWindow) => {
	const project = useProjectContext();
	const user = useAuthContext();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
		const ydoc = new Y.Doc();
		const type = ydoc.getText('monaco')
		const provider = new WebsocketProvider(
			serverWsUrl, // use the public ws server
			project._id,
			ydoc
		);
		const awareness = provider.awareness
		awareness.setLocalStateField('user', {
			name: user.firstName + user.lastName,
			id: user._id,
			color: ("#"+Math.floor(Math.random()*16777215).toString(16)).toString()
		})
		// You can observe when a user updates their awareness information
		awareness.on('change', () => {
			const statesArray = Array.from(awareness.getStates());
			console.log(statesArray);
			statesArray.forEach(([clientId, state])  => {
        if (state.user) {
					CursorStyling(clientId,state.user.color,state.user.name)
        }
      });
		})
	
		const monacoBinding = new MonacoBinding(type, editorRef.current.getModel()!, new Set([editorRef.current]), awareness)
		return () => {
			if (provider) {
				console.log('huh')
				awareness.destroy();
				provider.disconnect(); //We destroy doc we created and disconnect 
				ydoc.destroy();  //the provider to stop propagting changes if user leaves editor
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
				onChange={handleEditorChange}
				onMount = {handleEditorDidMount}
      />
    </div>
  );
};
export default CodeEditorWindow;