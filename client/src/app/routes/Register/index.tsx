import 'bootstrap/dist/css/bootstrap.css'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./Register.scss"
export default function Register() {
	const navigate = useNavigate();
	return ( 
		<form className="form-container">
			<h3>Sign Up</h3>
			<div className="mb-3">
				<label>First name</label>
				<input
					type="text"
					className="form-control"
					placeholder="First name"
				/>
			</div>
			<div className="mb-3">
				<label>Last name</label>
				<input type="text" className="form-control" placeholder="Last name" />
			</div>
			<div className="mb-3">
				<label>Email address</label>
				<input
					type="email"
					className="form-control"
					placeholder="Enter email"
				/>
			</div>
			<div className="mb-3">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter password"
				/>
			</div>
			<div className="d-grid">
				<button type="submit" className="btn btn-primary">
					Sign Up
				</button>
			</div>
			<Button variant="link" className="switch-form" onClick = {()=>navigate("/auth/login")}>
				Log In
			</Button>
		</form >
	); 
}