import { IAuthUser, IUser } from "../../types/auth"

export interface IEditProfileModal {
	user: IAuthUser,
	userProfile:IUser,
	onClose: () => void;
}

export interface IUpdateInfo{
	newFirstName: string,
	newLastName: string,
	newEmail: string,
}