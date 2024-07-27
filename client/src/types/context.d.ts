export type AuthContextType = {
	state: IUser;
	setState: (newSession: IUser) => void;
};
