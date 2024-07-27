import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle";
import '../assets/HomePage.css';
import { RouteObject,Outlet } from 'react-router-dom';
import Axios from "axios";
import {ProjectContextProvider} from "../context/ProjectContext"

// Route Import 
import Root from './Root';
import Login from './Login';
import Register from './Register';
import Navbar from '../foundation/ui/Navbar';
import AuthLayout from "../foundation/ui/AuthLayout";
import PrivateRoutes from "../foundation/routeWrapper/PrivateRoutes";
import EditRoute from "../foundation/routeWrapper/EditRoute";
import Editing from "./Editing";
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
			element: <PrivateRoutes><ProjectContextProvider> <Navbar /> </ProjectContextProvider></PrivateRoutes>,
			children: EditingRoute,
			loader: async ({ params }) => {
				const res = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/projects/single/${params.projectId}`)
				return res.data;
			},
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