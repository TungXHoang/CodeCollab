import { useEffect, useState } from "react";
import { GetAllUsers } from "../foundation/authAPI"

import { IAuthUser } from "../types/auth";

export const useGetAllUsers = () => {
	const [loadingAllUsers, setLoading] = useState(false);
	const [allUsers, setAllUsers] = useState<IAuthUser[] | undefined>(undefined);

	useEffect(() => {
		let isCancelled = false;
		const getAllUsers = async () => {
			setLoading(true);
			try {
				const res = await GetAllUsers();
				setAllUsers(res);
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false); 
			}
		};

		if (!isCancelled) {
			getAllUsers();
		}
	
		return () => { isCancelled = true }
	}, []);
	
	return { loadingAllUsers, allUsers };
};

