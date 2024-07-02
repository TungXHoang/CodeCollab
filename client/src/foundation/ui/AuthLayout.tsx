import "../../assets/AuthLayout.css";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react';


interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }): React.JSX.Element=> {
	const user = useAuth();
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