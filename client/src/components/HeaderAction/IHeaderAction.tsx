import {IProject} from "../ProjectsList/IProject"

export interface IHeaderAction {
	onCreate: (project: IProject) => void;
	searchField: string;
	onChange: (change: string) => void;
	// setSearchField: React.Dispatch<React.SetStateAction<string>>
}