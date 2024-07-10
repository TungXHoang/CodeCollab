export interface IProject {
  _id: string;
  title: string;
  language: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  messages: string[]; // Adjust the type if you have a specific type for messages
}

export interface IProjectProps {
  name: string;
  id: string;
  onDelete: (id: string) => void;
}