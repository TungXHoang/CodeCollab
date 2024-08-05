import { useState, useEffect } from 'react';
import Axios from "axios";

interface IGuestList {
	_id: string,
	projectId: string,
	guestId: string
}

function useGetGuests(projectId: string) {
	const [loadingGuests, setLoadingGuests] = useState(false);
	const [guestsList, setGuestsList] = useState<IGuestList[] | undefined>(undefined);

	useEffect(() => {

		const getGuests = async () => {
			try {
				setLoadingGuests(true);
				const res = await Axios.get(`${import.meta.env.VITE_CLIENT_BASEURL}/api/guests/${projectId}`);
				setGuestsList(res.data as IGuestList[]);
			}
			catch (err) {
				console.log(err)
			}
			finally {
				setLoadingGuests(false);
			}
			
		};
		getGuests();
	}, [projectId]);

	return { loadingGuests, guestsList };
}

export {useGetGuests} ;