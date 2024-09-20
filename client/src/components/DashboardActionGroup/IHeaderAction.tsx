import {IProject} from "../../types/project"

export interface IHeaderAction {
	onCreate: (project: IProject) => void;
	searchField: string;
	onChange: (change: string) => void;
}