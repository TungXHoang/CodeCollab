import "../../assets/AuthLayout.scss";
import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks";
import { Navigate } from "react-router-dom";
import React from 'react';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }): React.JSX.Element=> {
	const auth = useAuth();

	if (auth === undefined) {
    return <></>; // or loading indicator/spinner/etc
	}
	
	return !auth ?
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