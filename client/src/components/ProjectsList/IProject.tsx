
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
	code: string;// Adjust the type if you have a specific type for messages
}

export interface IProjectProps {
  name: string;
	id: string;
	ownerId: string;
  onDelete: (id: string) => void;
}

export interface IProjectsListProps { 
	onDelete: (id:string) => void;
	projectsList : IProject[]
	isOwner: boolean
}
