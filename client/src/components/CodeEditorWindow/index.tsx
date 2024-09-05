import { useState } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ICodeEditorWindow } from "./ICodeEditorWindow";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEditNavbar } from "../../components/EditingNavbar";
import useDebounce from "../../hooks/useDebounce.tsx";
import { SaveDocsAPI } from "../../foundation/compileAPI/index.tsx"
import { useYjs } from "../../hooks/useYjs";

type Monaco = typeof monaco 

const CodeEditorWindow = ({ user, project,language,editorRef,setEditorRef }: ICodeEditorWindow) => {
	const [isEditorMounted, setIsEditorMounted] = useState(false);
	const { setCode } = useEditNavbar();
	const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
		setEditorRef(editor);
		setIsEditorMounted(true); // Editor has mounted, stop showing loader
	};

		
	const debouncedRequest = useDebounce(async () => {
		await SaveDocsAPI(project._id);
	});

	useYjs(editorRef, project._id, user);

	const handleBeforeMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("myTheme", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.foreground": "#D4D4D4",
				"editor.background": "#1C2333",
				"editorCursor.foreground": "#0079F2",
				"editor.lineHighlightBackground": "#2B3245",
			},
		});
	}
	
	const handleEditorChange = () => {
		if (editorRef) {
			setCode(editorRef.getValue())
			debouncedRequest();
		}
	}

	return (
		<div className="overlay relative rounded-md overflow-hidden w-full h-full shadow-4xl">
      {!isEditorMounted && (
        <div className="absolute inset-0 z-10">
					<Skeleton
						height="100vh"
						width="100%"
						baseColor="#1e1e1e"
						borderRadius="0.5rem"
						duration={0} />
        </div>
      )}
      <Editor
				height="100vh"
				width="auto"
        language={language}
        theme="myTheme"
        onChange={handleEditorChange}
				onMount={handleEditorDidMount}
				beforeMount={handleBeforeMount}
        loading={null}
      />
    </div>
  );
};
export default CodeEditorWindow;