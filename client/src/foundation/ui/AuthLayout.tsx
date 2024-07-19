import "../../assets/AuthLayout.css";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import { IAuthUser } from "../../types/auth";

interface AuthLayoutProps {
  children?: React.ReactNode;
}


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }): React.JSX.Element=> {
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
	return !user.auth ?
		<div className="auth-wrapper">
			{children}
		</div>
		:
		<Navigate to="/app" replace />;
  ;
}

export default AuthLayout;