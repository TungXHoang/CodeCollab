export interface ICodeEditorWindow { 
	onEdit: (data:string)=>void
	language: string,
	code: string
} 
