import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../foundation/authAPI';
import {AlertMessage} from "../../foundation/ui/AlertMessage"

interface ICredential {
	password: "",
	email: "",
}

interface IAlert {
	message: string,
	show: boolean
} 

export default function Login() { 
	const navigate = useNavigate();
	const [credential, setCredential] = useState<ICredential>({ password: "", email: ""});
	const [alert, setAlert] = useState<IAlert>({message: "", show: false});

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((currData) => {
			return {
				...currData,
				[evt.target.name]: evt.target.value,
			};
		});
	};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await LoginAPI(credential);
		setCredential({
				password: "",
				email: "",
		});
		if (response.auth) {
			return navigate("/app", { replace: true });
		}
		else {
			setAlert({
				message: response.msg,
				show: true,
			});
		}
	};

	const closeAlert = () => {
		setAlert({
			message: "",
			show: false,
		});
	};

	return (
		<div className="flex flex-col margin-auto p-[50px] pt-0 w-[470px]">
			<div className="text-white font-semibold text-[32px] leading-[1.6] text-center">Welcome back</div>
			<h1 className="text-[14px] text-gray-400 text-center font-normal mt-1 mb-3">Log in to your account</h1>
			{alert.show && <AlertMessage message={alert.message} handleClose={closeAlert}/>}
			<form autoComplete="off" onSubmit={handleLogin}>
				<div className="mb-3 relative">
					<label className="text-gray-500 text-[10px] leading-[14px] absolute top-[10px] left-[16px] z-10">Email</label>
					<input
						required
						type="email"
						name="email"
						className="bg-gray-700/[0.15] text-white text-[14px] leading-[24px] rounded-[6px] w-full pt-[24px] pl-[16px] pr-[48px] pb-[5px]"
						onChange={handleChange}
						value={credential.email}
					/>
				</div>
				<div className="mb-3 relative">
					<label className="text-gray-500 text-[10px] leading-[14px] absolute top-[10px] left-[16px] z-10">Password</label>
					<input
						type="password"
						name="password"
						className="bg-gray-700/[0.15] text-white text-[14px] leading-[24px] rounded-[6px] w-full pt-[24px] pl-[16px] pr-[48px] pb-[5px]"
						onChange={handleChange}
						value={credential.password}
					/>
				</div>
				<div>
					<button type="submit" className="text-[13px] font-semibold flex items-center justify-center w-full p-[16px] gap-[12px] rounded-[6px] bg-blue-600 text-white hover:bg-blue-500">
						Log in
					</button>
				</div>
				<div>
					<a href="/auth/register" className="flex justify-center mt-[15px] text-gray-400 hover:text-gray-200 underline">
						Don't have an account? Create one here.
					</a>
				</div>
			</form>
		</div>

	); 
}