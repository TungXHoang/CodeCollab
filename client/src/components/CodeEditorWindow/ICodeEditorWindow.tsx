import { editor } from "monaco-editor";
import { IProject } from "../../types/project";
import { IAuthUser } from "../../types/auth";

export interface ICodeEditorWindow { 
	user: IAuthUser
	project: IProject,
	language: string,
	editorRef: editor.IStandaloneCodeEditor | null,
	setEditorRef:React.Dispatch<React.SetStateAction<editor.IStandaloneCodeEditor | null>>
} 
