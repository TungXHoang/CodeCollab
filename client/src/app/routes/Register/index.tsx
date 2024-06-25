import 'bootstrap/dist/css/bootstrap.css'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Register.css"
import { useState } from 'react';
import { RegisterAPI } from '../../../foundation/auth';

export default function Register() {
	const navigate = useNavigate();
	const [credential, setCredential] = useState({
		firstName: "",
		lastName:"",
		password: "",
		email: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((currData) => {
			return {
					...currData,
					[e.target.name]: e.target.value,
			};
		});
	};

	const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.preventDefault();
			try {
				const formData = new FormData();
				for (const [key, value] of Object.entries(credential)) {
					formData.append(`${key}`, value);
				}
				const response = await RegisterAPI(formData);
				setCredential({
					firstName: "",
					lastName: "",
					password: "",
					email: "",
				});
				if (response.auth) {
					return navigate("/app");
				}
			} catch (e) {
					console.log(e);
			}
		}
	};

	return ( 
		<form className="form-container" onSubmit={handleRegistration}>
			<h3>Sign Up</h3>
			<div className="mb-3">
				<label>First name</label>
				<input
					type="text"
					name="firstName"
					className="form-control"
					placeholder="First name"
					onChange={handleChange}
					value={credential.firstName}
				/>
			</div>
			<div className="mb-3">
				<label>Last name</label>
				<input
					type="text"
					name="lastName"
					className="form-control"
					placeholder="Last name"
					onChange={handleChange}
					value={credential.lastName}
				/>
			</div>
			<div className="mb-3">
				<label>Email address</label>
				<input
					type="email"
					name="email"
					className="form-control"
					placeholder="Enter email"
					onChange={handleChange}
					value={credential.email}
				/>
			</div>
			<div className="mb-3">
				<label>Password</label>
				<input
					name ="password"
					type="password"
					className="form-control"
					placeholder="Enter password"
					onChange={handleChange}
					value={credential.password}
				/>
			</div>
			<div className="d-grid">
				<button type="submit" className="btn btn-primary">
					Sign Up
				</button>
			</div>
			<div className = "switch-form">
				<Button variant="link" className="switch-button" onClick = {()=>navigate("/auth/login")}>
					Log In
					</Button>
			</div>
		</form >
	); 
}