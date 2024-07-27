import React, { ReactNode } from "react";

import { AuthContextProvider } from "../../context/AuthContext";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {

	return <AuthContextProvider><React.Fragment>{children}</React.Fragment></AuthContextProvider>

};

export default PrivateRoutes;