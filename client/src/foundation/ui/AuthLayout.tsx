import { useAuth } from "../../hooks/useAuth";
import { Navigate,useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: {children:React.ReactNode})=> {
	const { loadingAuthUser, authUser } = useAuth()
	const navigate = useNavigate();
	if (authUser === undefined || loadingAuthUser) {
    return <></>; // or loading indicator/spinner/etc
	}
	return !authUser.auth ?
		<div className="flex h-full justify-center items-center w-full bg-[#0e1525]">
			<span onClick={()=>navigate(`${import.meta.env.BASE_URL}`)} className="absolute flex items-center justify-center text-white top-[24px] left-[28px] space-x-2 cursor-pointer">
				<img className="w-[32px] h-[32px] text-center" src={`${import.meta.env.VITE_APP_LOGO}`} alt="CodeCollab Logo" />
				<h2 className="text-[20px] font-semibold">CodeCollab</h2>
			</span>
			{children}
		</div>
		:
		<Navigate to="/app" replace />;
  ;
}

export default AuthLayout;