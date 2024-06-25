import 'bootstrap/dist/css/bootstrap.css'; 
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import "./Login.css"
import { LoginAPI } from '../../../foundation/auth';


export default function Login() { 
	const navigate = useNavigate();
	const [credential, setCredential] = useState({
		password: "",
		email: "",
	});

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((currData) => {
			return {
					...currData,
					[evt.target.name]: evt.target.value,
			};
		});
};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await LoginAPI(credential);
		setCredential({
				password: "",
				email: "",
		});
		if (response.auth) {
			// change(true, response.username, response.id);
			// return navigate(`/${response.username}`, { replace: true });
			return navigate("/app", { replace: true });
		}
		else {
			console.log("fail");
		}
		return;
};

	return ( 
		<form className = "form-container" onSubmit={handleLogin}>
			<h3>Log In</h3>
			<div className="mb-3">
				<label>Email address</label>
				<input
					type="email"
					name = "email"
					className="form-control"
					placeholder="Enter email"
					onChange={handleChange}
					value={credential.email}
				/>
			</div>
			<div className="mb-3">
				<label>Password</label>
				<input
					type="password"
					name="password"
					className="form-control"
					placeholder="Enter password"
					onChange={handleChange}
					value={credential.password}
				/>
			</div>
			<div className="d-grid">
			<button type="submit" className="btn btn-primary" >
					Log in
				</button>
		</div>
			<div className ="switch-form">
				<Button variant="link" className="switch-button" onClick={()=>navigate("/auth/register")}>
					Register
				</Button>
			</div>
		</form>
	); 
}