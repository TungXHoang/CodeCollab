export type UserContextType = {
	state: IUser;
	setState: (newSession: IUser) => void;
};
