export interface IProject {
  _id: string;
  title: string;
	language: string;
	languageId: number,
	owner: {
		email: string,
		firstName: string,
		lastName: string,
		__v: number,
		_id: string,
	};
  createdAt: string;
  updatedAt: string;
  __v: number;
	code: string;// Adjust the type if you have a specific type for messages
}

export interface IProjectProps {
  name: string;
  id: string;
  onDelete: (id: string) => void;
}