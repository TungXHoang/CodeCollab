import { useState, useEffect } from 'react';
import { isLoggedIn } from "../foundation/authAPI";

interface AuthResponse {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

function useAuth() {
	const [user, setUser] = useState<AuthResponse | undefined>(undefined);
	useEffect(() => {
		async function checkAuth() {
			const res: AuthResponse = await isLoggedIn();
			setUser(res);
		};
		checkAuth();
	}, []);

	return user;
}

export {useAuth} ;