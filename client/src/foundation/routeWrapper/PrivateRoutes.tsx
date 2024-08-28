import React, { ReactNode } from "react";

import { AuthContextProvider } from "../../context/AuthContext";
import {UserProjectsContextProvider} from "../../context/UserProjectsContext"
interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {

	return <AuthContextProvider><UserProjectsContextProvider>{children}</UserProjectsContextProvider></AuthContextProvider>

};

export default PrivateRoutes;