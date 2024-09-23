import { useState, useEffect } from 'react';
import { isLoggedIn } from "../foundation/authAPI";
import { IAuthUser } from "../types/auth";

function useAuth() {
	const [authUser, setAuthUser] = useState<IAuthUser | undefined>(undefined);
	const [loadingAuthUser, setLoadingAuthUser] = useState(false);
	useEffect(() => {
		async function checkAuth() {
			setLoadingAuthUser(true)
			try {
				const res: IAuthUser = await isLoggedIn();
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