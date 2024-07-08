import { useNavigate } from "react-router-dom";
import {LogoutAPI} from "../../foundation/auth";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ProjectsList from "../../components/ProjectsList";

export default function Dashboard() {
	const navigate = useNavigate();
	const handleLogOut = async () => {
		await LogoutAPI();
		return navigate("/");
	};

	//context use
	const user = useContext(UserContext)
	return (
		<>
			<div> Hello {user.firstName} {user.lastName} </div> 
			<div> This is Dashboard </div>
			<button onClick={handleLogOut}>Log Out</button>
			<ProjectsList/>
		</>
	)
}