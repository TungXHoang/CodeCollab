import { useState, useEffect } from 'react';
import { IUser } from "../types/auth";
import { ResizeImgKit } from "../foundation/utils/UtilsFunction.tsx";
import { GetUserProfile } from "../foundation/authAPI";

function useGetUserProfile(userEmail:string) {
	const [userProfile, setUserProfile] = useState<IUser | undefined>(undefined);
	const [error, setError] = useState(false);
	const [loadingUserProfile, setLoadingUserProfile] = useState(false);

	useEffect(() => {
		async function GetUser() {
			try {
				setLoadingUserProfile(true);
				const response = await GetUserProfile({ userEmail: userEmail! });
				if (response) {
					response.thumbnailUrl = ResizeImgKit({ baseUrl: response.thumbnailUrl, newWidth:200, newHeight:200 })
					setUserProfile(response);
					setError(false);
				}
				else {
					setError(true);
				}
			}
			catch (err) {
				console.log(err);
			}
			finally {
				setLoadingUserProfile(false);
			}
		}
		GetUser();
	},[userEmail])
	
	return {loadingUserProfile, userProfile,error};
}

export default useGetUserProfile ;