import { createContext } from 'react';

// Define the interface for the context
interface IUserContext {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

// Create the context with the appropriate default value and type
export const UserContext = createContext<IUserContext>({
	auth: false,
	_id: "",
	lastName: "",
	firstName: "",
});