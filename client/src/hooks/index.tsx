import { useState, useEffect } from 'react';
import { isLoggedIn } from "../foundation/auth";

function useAuth() {
	const [auth, setAuth] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		async function checkAuth() {
			const res = await isLoggedIn();
			setAuth(res.auth ? true : false);
		}
		
		checkAuth();
	}, []);

	return auth;
}

export {useAuth} ;