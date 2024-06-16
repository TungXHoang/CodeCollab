import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  children?: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({children}) : React.JSX.Element =>{
	const flag = true;
	if (!flag) {
		return <Navigate to="/auth/login" replace />;
	}
	return <>{children}</>;

	// const context = useOutletContext();
	// console.log(context)
	// if (!context.user || !context.user?.role.includes(role)) {
	// 	return <Navigate to="/" replace />;
	// }

	// return <Outlet context={context}/>;
};

export default PrivateRoutes
