import { editor } from "monaco-editor";
import {IProject} from "../ProjectsList/IProject"
export interface ICodeEditorWindow { 
	project: IProject,
	language: string,
	editorRef: editor.IStandaloneCodeEditor | null,
	setEditorRef:React.Dispatch<React.SetStateAction<editor.IStandaloneCodeEditor | null>>
	
} 
