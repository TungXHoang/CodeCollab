import { IUser } from "./auth";

export interface IProject {
  _id: string;
  title: string;
	language: string;
	languageId: number;
	description: string;
	owner: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

