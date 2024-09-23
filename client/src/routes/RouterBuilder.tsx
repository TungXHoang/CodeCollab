import { RouteObject,Outlet } from 'react-router-dom';
import ErrorPage from "./ErrorPage/index.tsx";

// Route Import 
import Root from './Root';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import Navbar from '../components/Navbar';
import EditingNavbar from "../components/EditingNavbar";
import AuthLayout from "../foundation/ui/AuthLayout";
import Editing from "./Editing";
import Dashboard from "./Dashboard";
// Route wrapper
import PrivateRoutes from "../foundation/routeWrapper/PrivateRoutes";
import ProjectRoutes from "../foundation/routeWrapper/ProjectRoutes";
import { AuthContextProvider } from '../context/AuthContext.tsx';
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
		{
			path: "/user/:userEmail",
			element: <UserProfile />,
		}
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
			element: <Root />,
			errorElement: <ErrorPage />,
		},
		{
			element: <ProjectRoutes> <EditingNavbar /> </ProjectRoutes>,
			children: EditingRoute,
		},
	  {
      element: <AuthLayout> <Outlet/> </AuthLayout>,
      children: authRoutes
    },
		{
			element: <PrivateRoutes> <Navbar/> </PrivateRoutes>,
			children: privateRoutes
		},
  ];

  return routes;
};

export default RouterBuilder;