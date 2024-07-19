import React, { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth  } from "../../hooks/useAuth";
import { UserContext } from "../../context/UserContext";
import { IAuthUser } from "../../types/auth";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {

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
  return user.auth
		?
			<UserContext.Provider value={user}>
				<React.Fragment>{children}</React.Fragment>
			</UserContext.Provider>
    : <Navigate to="/auth/login" replace />;
};

export default PrivateRoutes;