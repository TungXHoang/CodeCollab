import { createContext,useContext, useState, useEffect, ReactNode } from 'react';
import { IAuthUser } from "../types/auth";
import { useAuth  } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

// Define the interface for the context


export const AuthContext = createContext<IAuthUser | undefined>(undefined);

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("Auth Context must not be undefined")
	}
	return context
};

export const AuthContextProvider = ({ children }: { children: ReactNode})  => {
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


