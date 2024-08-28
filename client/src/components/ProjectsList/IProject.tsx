
export interface IOwner {
	email: string;
	firstName: string;
	lastName: string;
	__v: number;
	_id: string;
}

export interface IProject {
  _id: string;
  title: string;
	language: string;
	languageId: number;
	description: string;
	owner: IOwner
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProjectProps {
	project: IProject;
	onDelete: (id: string[]) => void;
	onCheck: (projectId:string,checked:boolean)=>void;
	isChecked: boolean;
}

export interface IProjectsListProps { 
	onCreate: (project: IProject)=>void;
	onDelete: (id:string[]) => void;
	projectsList : IProject[]
	isOwner: boolean
}
