export interface IAuthUser {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

export interface IRegisterCrendential{
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}