import {IProject} from "../ProjectsList/IProject"

export interface IHeaderAction {
	onCreate: (project: IProject) => void;
	searchField: string;
	setSearchField: React.Dispatch<React.SetStateAction<string>>
}