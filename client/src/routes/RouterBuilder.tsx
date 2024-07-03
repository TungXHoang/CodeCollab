import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle";
import '../assets/HomePage.css';
import { RouteObject,Outlet } from 'react-router-dom';


// Route Import 
import Root from './Root';
import Login from './Login';
import Register from './Register';
import Navbar from '../foundation/ui/Navbar';
import AuthLayout from "../foundation/ui/AuthLayout";
import PrivateRoutes from "../foundation/utils/PrivateRoutes";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

const RouterBuilder = () => {
 
	// Declare Routes
	const authRoutes: RouteObject[] = [
		{
			path: "/auth/login",
			element: <Login />
		},
		{
			path: "/auth/register",
			element: <Register />
		}
	];
	const privateRoutes: RouteObject[] = [
		{
			path: "/app",
			element: <Dashboard />
		},
	]

	// All routes
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Root/>
		},
		{
			path: "/landing",
			element: <Landing/>
		},
	  {
      element: <AuthLayout> <Outlet/> </AuthLayout>,
      children: authRoutes
    },
		{
			element: <PrivateRoutes> <Navbar/> </PrivateRoutes>,
			children: privateRoutes,
		}
  
    
  ];

  return routes;
};

export default RouterBuilder;