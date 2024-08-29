import React, { ReactNode } from "react";

import { ProjectContextProvider } from "../../context/ProjectContext";
import { AuthContextProvider } from "../../context/AuthContext";
interface ProjectRoutesProps {
    children: ReactNode;
}

const ProjectRoutes: React.FC<ProjectRoutesProps> = ({
    children,
}): React.JSX.Element => {
	return <AuthContextProvider><ProjectContextProvider><React.Fragment>{children}</React.Fragment></ProjectContextProvider></AuthContextProvider>
};

export default ProjectRoutes;