import { createContext,useContext, useState, useEffect, ReactNode } from 'react';
import { IAuthUser } from "../types/auth";
import { useAuth  } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import AuthContextSkeleton from "../components/SkeletonComponent/AuthContextSkeleton" 
	
// Define the interface for the context

export const AuthContext = createContext<{ user: IAuthUser,setUser:React.Dispatch<React.SetStateAction<IAuthUser | undefined>> } | undefined>(undefined);
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


  if (user === undefined || loadingAuthUser) {
		return <AuthContextSkeleton />;
	}

	return user.auth ?
		<AuthContext.Provider value={{user,setUser}}>
			{children}
		</AuthContext.Provider> :
		<Navigate to="/auth/login" replace />;
};


