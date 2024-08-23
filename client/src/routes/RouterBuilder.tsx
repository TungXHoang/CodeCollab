import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle";
import '../assets/HomePage.css';
import { RouteObject,Outlet } from 'react-router-dom';

// Route Import 
import Root from './Root';
import Login from './Login';
import Register from './Register';
import Navbar from '../components/Navbar';
import AuthLayout from "../foundation/ui/AuthLayout";
import Editing from "./Editing";
import Dashboard from "./Dashboard";

// Route wrapper
import PrivateRoutes from "../foundation/routeWrapper/PrivateRoutes";
import ProjectRoutes from "../foundation/routeWrapper/ProjectRoutes";

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
	const EditingRoute: RouteObject[] = [
		{
			path: "/edit/:projectId",
			element: <Editing />,
		}
	]

	// All routes
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Root/>
		},
		{
			element: <PrivateRoutes><ProjectRoutes> <Navbar /> </ProjectRoutes></PrivateRoutes>,
			children: EditingRoute,
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