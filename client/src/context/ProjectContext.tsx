import { createContext } from 'react';
import {IProject} from "../components/ProjectsList/IProject"
// Define the interface for the context

// Create the context with the appropriate default value and type
export const ProjectContext = createContext<IProject>({
	_id: "",
  title: "",
	language: "",
	languageId: 63,
  owner: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
	code: "", // Adjust the type if you have a specific type for messages
	collaborators: [],
});