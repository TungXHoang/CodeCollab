interface IUser {
	_id: string;
	lastName: string;
	firstName: string;
	email: string;
	avatar: {
		url: string,
		filename: string,
	}
	thumbnailUrl:string,
}

export interface IAuthUser extends IUser {
  auth: boolean;
}

export interface IRegisterCrendential{
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}