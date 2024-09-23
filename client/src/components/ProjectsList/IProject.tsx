import { IProject } from "../../types/project";

export interface IProjectProps {
	project: IProject;
	onDelete: (id: string[]) => void;
	onCheck: (project:IProject,checked:boolean)=>void;
	isChecked: boolean;
}

export interface IProjectsListProps { 
	onCreate: (project: IProject)=>void;
	onDelete: (id:string[]) => void;
	projectsList : IProject[]
	isOwner: boolean
}

export interface IProfileProjectProps {
	project: IProject;
	onDelete: (id: string[]) => void;
	isOwner: boolean;
}