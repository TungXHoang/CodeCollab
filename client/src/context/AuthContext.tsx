import { createContext,useContext, useState, useEffect, ReactNode } from 'react';
import { IAuthUser } from "../types/auth";
import { useAuth  } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

// Define the interface for the context
interface IAuthContext {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

interface AuthContextProps {
	children: ReactNode;
}


export const AuthContext = createContext<IAuthContext>({
	auth: false,
	_id: "",
	lastName: "",
	firstName: "",
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<AuthContextProps>  = ({ children })  => {
	const [user, setUser] = useState<IAuthUser | undefined>(undefined)
	const { loadingAuthUser, authUser } = useAuth()

	useEffect(() => {
		if (!loadingAuthUser) {
			setUser(authUser);
		}
	}, [loadingAuthUser, authUser]);

  if (user === undefined) {
    return <></>; // or loading indicator/spinner/etc
  }

	return user.auth ?
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider> :
		<Navigate to="/auth/login" replace />;
};


