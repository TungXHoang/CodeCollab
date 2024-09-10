import { useNavigate } from 'react-router-dom';
import { useState, useRef} from 'react'
import { RegisterAPI } from '../../foundation/authAPI';
import { AlertMessage } from "../../foundation/ui/AlertMessage"
import { IRegisterCrendential } from "../../types/auth";

interface IAlert {
	message: string,
	show: boolean
} 

export default function Register() {
	const navigate = useNavigate();
	// const fileInputRef = useRef<HTMLInputElement>(null);
	const [alert, setAlert] = useState<IAlert>({ message: "", show: false});
	const [credential, setCredential] = useState<IRegisterCrendential>({
		firstName: "",
		lastName:"",
		password: "",
		email: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((currData) => {
			// if (e.target.name === "image") {
			// 	return {
			// 		...currData,
			// 		image: e.target.files ? e.target.files[0] : null,
			// 	};
			// }
			return {
				...currData,
				[e.target.name]: e.target.value,
			};
		});
};
	const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.preventDefault();
			try {
				// const formData = new FormData();
				// for (const [key, value] of Object.entries(credential)) {
				// 	formData.append(`${key}`, value); //using formData for sending image file
				// }
				const response = await RegisterAPI(credential);
				setCredential({
					firstName: "",
					lastName: "",
					password: "",
					email: "",
				});
			// 	if (fileInputRef.current) {
			// 		fileInputRef.current.value = "";
			// }
				if (response.auth) {
					return navigate("/app");
				}
				else {
					setAlert({
						message: response.msg,
						show: true,
					})
				}
			} catch (e) {
				console.log(e);
			}
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
			<div className="text-white font-semibold text-[32px] leading-[1.6] text-center">Get Started</div>
			<h1 className="text-[14px] text-gray-400 text-center font-normal mt-1 mb-3">Create your account</h1>
			{alert.show && <AlertMessage message={alert.message} handleClose={closeAlert}/>}
			<form autoComplete="off" onSubmit={handleRegistration}>
				<div className="mb-3 relative">
					<label className="text-gray-500 text-[10px] leading-[14px] absolute top-[10px] left-[16px] z-10">First Name</label>
					<input
						type="text"
						name="firstName"
						className="bg-gray-700/[0.15] text-white text-[14px] leading-[24px] rounded-[6px] w-full pt-[24px] pl-[16px] pr-[48px] pb-[5px]"
						onChange={handleChange}
						value={credential.firstName}
					/>
				</div>
				<div className="mb-3 relative">
					<label className="text-gray-500 text-[10px] leading-[14px] absolute top-[10px] left-[16px] z-10">Last Name</label>
					<input
						type="text"
						name="lastName"
						className="bg-gray-700/[0.15] text-white text-[14px] leading-[24px] rounded-[6px] w-full pt-[24px] pl-[16px] pr-[48px] pb-[5px]"
						onChange={handleChange}
						value={credential.lastName}
					/>
				</div>
				<div className="mb-3 relative">
					<label className="text-gray-500 text-[10px] leading-[14px] absolute top-[10px] left-[16px] z-10">Email</label>
					<input
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
						Sign up
					</button>
				</div>
				<div>
					<a href="/auth/login" className="flex justify-center mt-[15px] text-gray-400 hover:text-gray-200 underline">
						Have an account? Log in.
					</a>
				</div>
			</form>
		</div>
	); 
}