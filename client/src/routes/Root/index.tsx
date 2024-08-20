import "./Root.scss"
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Root() {
	const navigate = useNavigate();
  return (
		<div className="root-wrapper">
			<div className="root-inner">
				<h2 className="header">CodeCollab </h2>
				<img src={logo} />
				<div className="brief">Real-time collaborative online coding platform. </div>
				<div className="button-row">
					<Button className="start-button" variant="light"
						onClick = {()=>navigate("/app")}>
					Get Started</Button>
					<Button className="github-button" variant="light"
						onClick={() => window.open("https://github.com/TungXHoang/CodeCollab", '_blank')}>
					GitHub Repo</Button>  
				</div>
			</div>	
		</div>
  );
};