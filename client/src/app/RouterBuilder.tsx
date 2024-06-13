import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle";
import '../assets/index.css';
import { RouteObject,Outlet } from 'react-router-dom';

// Route Import 
import Root from './routes/Root';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from '../foundation/ui/Navbar';
import AuthLayout from "../foundation/ui/AuthLayout";
import PrivateRoutes from "../foundation/utils/PrivateRoutes";
import Dashboard from "./routes/Dashboard";

const RouterBuilder = () => {
  // const generalRoutes: RouteObject[] = [
  //   {
  //     path: "/",
  //     element: <Root/>
  //   },
  // ];
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
		}
			
	]
  // add auth route and its layer

	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Root/>
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