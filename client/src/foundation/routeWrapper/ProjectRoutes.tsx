import React, { ReactNode } from "react";

import { ProjectContextProvider } from "../../context/ProjectContext";

interface ProjectRoutesProps {
    children: ReactNode;
}

const ProjectRoutes: React.FC<ProjectRoutesProps> = ({
    children,
}): React.JSX.Element => {

	return <ProjectContextProvider><React.Fragment>{children}</React.Fragment></ProjectContextProvider>

};

export default ProjectRoutes;