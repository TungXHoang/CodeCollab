import Axios from "axios";
import {IRegisterCrendential} from "../../types/auth"
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
				id: response.data.id,
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
	const { email, password } = credential;
	try {
		const response = await Axios.post(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/login`, {
				email: email,
				password: password, 
		});
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
	return { auth: response.data.auth, username: "", id: "" };
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

// async function fetchUserData(id: string, thumbnailDim: number) {
// 	const response = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/users/${id}/${thumbnailDim}`);
// 	if (response) {
// 		const { username, _id, avatar, thumbnail } = response.data.user;
// 		return {
// 				auth: true,
// 				username: username,
// 				id: _id,
// 				avatar: avatar,
// 				thumbnail: thumbnail,
// 		};
// 	}
// }
export { LogoutAPI, LoginAPI, isLoggedIn, RegisterAPI, GetAllUsers };
