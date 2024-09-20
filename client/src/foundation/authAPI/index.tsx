import Axios, {AxiosResponse} from "axios";
import { IRegisterCrendential, IGetSingleUser,IUpdateUserProfile,IUpdateUserProfileResponse,IUpdateUserAvatarResponse} from "./IAuthAPI";
import { IUser } from "../../types/auth";
import { showToast } from "../../foundation/utils/ToastMessage.tsx"

interface LoginCredential {
	password: string;
	email: string;
}


async function RegisterAPI(registerCredential: IRegisterCrendential ) {
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/register`, registerCredential);
	if (response.data.auth) {
		return {
			auth: true,
			msg: "Register Successfully",
		};
	} else {
		return {
			auth: false,
			msg:
				response.data.err.name === "UserExistsError"
					? "A user with the given email is already registered"
					: response.data.err.message,
		};
	}
}

async function LogoutAPI() {
	try {
		const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/logout`);
		return response;
	}
	catch (err) {
		console.log(err);
		return;
	}
}

async function LoginAPI(credential: LoginCredential) {
	try {
		const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/login`, credential);
		if (response.data.auth) {
			return {
				auth: response.data.auth,
			};
		}
		return { auth: false, msg: response.data.msg };
	} catch (e) {
		console.log("Error");
		console.log(e);
		return { auth: false, msg: e };
	}
}

async function isLoggedIn() {
	const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/auth`);
	if (response.data.auth) {
		return response.data;
	}
	return { auth: response.data.auth, id: "", lastName:"", firstName:"",email:"" };
}

async function GetAllUsers() {
	try {
		const response = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/getall`)
		return response.data;
	}
	catch (err) {
		console.log(err);
		return;
	}
}

async function GetUserProfile({userEmail}: IGetSingleUser) {
	try {
		const res: AxiosResponse<IUser,IGetSingleUser> = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/single/${userEmail}`);
		const result = res.data;
		return result;
	} catch (err) {
		if (Axios.isAxiosError(err)) {
			// showToast("error", err.response!.data.message, { containerId: shareProjectParams.toastContainer })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function UpdateUserProfile(updateCredential: IUpdateUserProfile) {
	try {
		const res:AxiosResponse<IUpdateUserProfileResponse,IUpdateUserProfile> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/update`, updateCredential )
		showToast("success", res.data.message, { containerId: "UserProfileToast" })
		const result = res.data;
		return result
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: "UserProfileToast" })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
	
}

async function UpdateUserAvatar(updateCredential: FormData) {
	try {
		const res:AxiosResponse<IUpdateUserAvatarResponse,FormData> = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/update-avatar`, updateCredential )
		showToast("success", res.data.message, { containerId: "UserProfileToast" })
		const result = res.data;
		return result
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: "UserProfileToast" })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
	
}

export { LogoutAPI, LoginAPI, isLoggedIn, RegisterAPI, GetAllUsers, GetUserProfile,UpdateUserProfile,UpdateUserAvatar };
