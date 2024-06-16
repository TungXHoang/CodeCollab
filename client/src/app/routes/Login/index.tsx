import 'bootstrap/dist/css/bootstrap.css'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import "./Login.scss"
import axios from "axios";

export default function Login() { 
	const navigate = useNavigate()
	return ( 
			<form className = "form-container">
        <h3>Log In</h3>
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
				<button type="submit" className="btn btn-primary" >
            Log in
          </button>
        </div>
        <Button variant="link" className="switch-form" onClick={()=>navigate("/auth/register")}>
        	Register
        </Button>
      </form>
	); 
}