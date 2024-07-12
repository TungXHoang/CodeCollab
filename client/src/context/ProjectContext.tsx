import { createContext } from 'react';

// Define the interface for the context
interface IProjectContext {
  _id: string;
  title: string;
  language: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
	messages: string[];// Adjust the type if you have a specific type for messages
	collaborators: string[];
}

// Create the context with the appropriate default value and type
export const ProjectContext = createContext<IProjectContext>({
	_id: "",
  title: "",
  language: "",
  owner: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
	messages: [], // Adjust the type if you have a specific type for messages
	collaborators: [],
});