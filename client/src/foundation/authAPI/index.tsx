import Axios from "axios";

interface LoginCredential {
	password: string;
	email: string;
}

// interface RegisterFormData {
// 	firstName: string;
// 	lastName: string;
// 	password: string;
// 	email: string;
// }

async function RegisterAPI(formData: FormData ) {
	const response = await Axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/users/register`, formData);
	console.log(response)
	if (response.data.auth) {
			return {
					auth: true,
					msg: "Register Successfully",
					id: response.data.id,
			};
	} else {
			return {
					//revise to change to dynamic
					auth: false,
					msg:
						response.data.err.code === 11000
							? "A user with the given email is already registered"
							: response.data.err.message,
			};
	}
}

async function LogoutAPI() {
	const response = await Axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/users/logout`);
	if (response.data.auth) {
			return response;
	}
	console.log(response);
	return response;
}

async function LoginAPI(credential: LoginCredential) {
	const { email, password } = credential;

	try {
		const response = await Axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/users/login`, {
				email: email,
				password: password, 
		});
		console.log(response);
		if (response.data.auth) {
			return {
				auth: response.data.auth,
				email: response.data.email,
				id: response.data.id,
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
	const response = await Axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/users/auth`);
	if (response.data.auth) {
		return response.data
	}
	return { auth: response.data.auth, username: "", id: "" };
}

async function fetchUserData(id: string, thumbnailDim: number) {
	const response = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/users/${id}/${thumbnailDim}`);
	if (response) {
		const { username, _id, avatar, thumbnail } = response.data.user;
		return {
				auth: true,
				username: username,
				id: _id,
				avatar: avatar,
				thumbnail: thumbnail,
		};
	}
}
export { LogoutAPI, LoginAPI, isLoggedIn, fetchUserData, RegisterAPI };
