import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth  } from "../../hooks";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {
	const auth = useAuth();

  if (auth === undefined) {
    return <></>; // or loading indicator/spinner/etc
  }

  return auth
    ? <React.Fragment>{children}</React.Fragment>
    : <Navigate to="/auth/login" replace />;
};

export default PrivateRoutes;