import { IAuthUser, IUser } from "../../types/auth"

export interface IEditProfileModal {
	user: IAuthUser,
	setUser: React.Dispatch<React.SetStateAction<IAuthUser | undefined>>,
	// setUser: (updatedUser:IUser)=>void;
	userProfile:IUser,
	onClose: () => void;
}

export interface IUpdateInfo{
	newFirstName: string,
	newLastName: string,
	newEmail: string,
}