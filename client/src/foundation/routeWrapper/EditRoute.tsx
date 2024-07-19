import React, { ReactNode, useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import {useGetGuests} from "../../hooks/useGetGuests.tsx"
import { ProjectContext } from "../../context/ProjectContext.tsx";
import { UserContext } from "../../context/UserContext.tsx";
import { IProject } from "../../components/ProjectsList/IProject.tsx"

interface ProtectedRoutesProps {
    children: ReactNode;
}


const EditRoute: React.FC<ProtectedRoutesProps> = ({
	children,
}): React.JSX.Element => {
	const user = useContext(UserContext)
	const [guests, setGuests] = useState<string[]>([])
	// loader data
	const project = useLoaderData() as IProject;

	//custom hook
	const { loading, guestsList } = useGetGuests(project._id)
	useEffect(() => {
		if (!loading) {
			const guestIds = guestsList.map(guest => guest.guestId);
			setGuests(guestIds);
		}
	}, [loading, guestsList]);
	

	if (user.auth && ((user._id === project.owner._id) || (guests.includes(user._id)))) {
		return <UserContext.Provider value={user}>
							<ProjectContext.Provider value={project}>
								<React.Fragment>{children}</React.Fragment>
							</ProjectContext.Provider>
						</UserContext.Provider>
		
	}
	else { 
		// show error log cannot access project
		return <></>
	}
};

export default EditRoute;