
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
	owner: IOwner
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProjectProps {
  name: string;
	id: string;
	ownerId: string;
	updateAt: string;
	ownerEmail: string;
  onDelete: (id: string) => void;
}

export interface IProjectsListProps { 
	onCreate: (project: IProject)=>void;
	onDelete: (id:string) => void;
	projectsList : IProject[]
	isOwner: boolean
}
