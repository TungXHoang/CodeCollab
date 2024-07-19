import { useState, useEffect } from 'react';
import { isLoggedIn } from "../foundation/authAPI";

interface AuthResponse {
	auth: boolean;
	_id: string;
	lastName: string;
	firstName: string;
}

function useAuth() {
	const [authUser, setAuthUser] = useState<AuthResponse | undefined>(undefined);
	const [loadingAuthUser, setLoadingAuthUser] = useState(false);
	useEffect(() => {
		async function checkAuth() {
			setLoadingAuthUser(true)
			try {
				const res: AuthResponse = await isLoggedIn();
				setAuthUser(res);
			}
			catch (err) {
				console.log(err);
			}
			finally {
				setLoadingAuthUser(false)
			}
			
		};
		checkAuth();
	}, []);
	
	return {loadingAuthUser, authUser};
}

export {useAuth} ;