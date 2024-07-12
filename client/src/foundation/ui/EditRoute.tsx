import React, { ReactNode } from "react";
import {  useLoaderData } from "react-router-dom";
import { useAuth  } from "../../hooks/useAuth";
import { ProjectContext } from "../../context/ProjectContext";
import { IProject } from "../../components/ProjectsList/IProject.tsx"

interface ProtectedRoutesProps {
    children: ReactNode;
}

const EditRoute: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {
	const project = useLoaderData() as IProject; 
	const user = useAuth();
  if (user === undefined) {
    return <></>; // or loading indicator/spinner/etc
	}
	if (user.auth && (user._id === project.owner || project.collaborators.includes(user._id))) {
		return <ProjectContext.Provider value={project}>
			<React.Fragment>{children}</React.Fragment>
		</ProjectContext.Provider>
	}
	else { 
		// show error log cannot access project
		return <></>
	}
};

export default EditRoute;