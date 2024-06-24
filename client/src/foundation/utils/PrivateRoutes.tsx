import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth  } from "../../hooks";
import { UserContext } from "../../context/UserContext";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {
	const user = useAuth();
  if (user === undefined) {
    return <></>; // or loading indicator/spinner/etc
  }
  return user.auth
		?
			<UserContext.Provider value={user}>
				<React.Fragment>{children}</React.Fragment>
			</UserContext.Provider>
    : <Navigate to="/auth/login" replace />;
};

export default PrivateRoutes;