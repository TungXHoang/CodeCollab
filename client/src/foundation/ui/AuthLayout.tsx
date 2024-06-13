import "../../assets/AuthLayout.scss"
import React from 'react';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;