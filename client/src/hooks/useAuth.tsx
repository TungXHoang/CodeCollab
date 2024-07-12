import { useState, useEffect } from 'react';
import { isLoggedIn } from "../foundation/authAPI";

interface AuthResponse {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

function useAuth() {
	const [auth, setAuth] = useState<AuthResponse | undefined>(undefined);
	useEffect(() => {
		async function checkAuth() {
			const res: AuthResponse = await isLoggedIn();
			setAuth(res);
		};
		checkAuth();
	}, []);

	return auth;
}

export {useAuth} ;