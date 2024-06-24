import { useNavigate } from "react-router-dom";
import {LogoutAPI} from "../../../foundation/auth";

export default function Dashboard() {
	const navigate = useNavigate();
	const handleLogOut = async () => {
		await LogoutAPI();
		// change(false, "", null);
		return navigate("/");
};
	return (
		<>
			<div> This is Dashboard </div>
			<button onClick={handleLogOut}>Log Out</button>
		</>
	)
}