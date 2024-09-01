import { IOwner,IProject} from "../../components/ProjectsList/IProject"

//Create Project
export interface ICreateProjectParams {
	language: string,
	laguageId: number,
	title: string,
	owner:string,
}

export interface ICreateProjectResponse extends IProject{
	
}


//Share Project
export interface IShareProjectParams {
	projectId: string,
	ownerId: string,
	guestEmail: string,
	toastContainer: string,
}

export interface IShareProjectResponse {
	guest: IOwner
	message: string
}

// Delete Guest

export interface IDeleteGuestParams {
	userId: string,
	guestId: string,
	projectId: string,
	containerId: string,
}

export interface IDeleteGuestResponse {
	_id: string,
	project: string,
	guest: string,
}

// Update Project

export interface IUpdateProjectParams {
	userId: string,
	projectId: string,
	newTitle: string,
	newDescription: string
}

export interface IUpdateProjectResponse {
	project: IProject,
	message: string,
}
