import React, { ReactNode } from "react";

import { ProjectContextProvider } from "../../context/ProjectContext";
import { SocketContextProvider } from "../../context/SocketContext";
interface ProjectRoutesProps {
    children: ReactNode;
}

const ProjectRoutes: React.FC<ProjectRoutesProps> = ({
    children,
}): React.JSX.Element => {
	return <ProjectContextProvider><SocketContextProvider><React.Fragment>{children}</React.Fragment></SocketContextProvider></ProjectContextProvider>
};

export default ProjectRoutes;