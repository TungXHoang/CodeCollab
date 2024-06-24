import "../../assets/AuthLayout.scss";
import { useAuth } from "../../hooks";
import { Navigate } from "react-router-dom";
import React, {useContext} from 'react';


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
			<div className="auth-inner">
				{children}
			</div>
		</div>
		:
		<Navigate to="/app" replace />;
  ;
}

export default AuthLayout;