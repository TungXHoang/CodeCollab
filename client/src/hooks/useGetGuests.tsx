import { useState, useEffect } from 'react';
import Axios from "axios";

interface IGuestList {
	_id: string,
	projectId: string,
	guestId: string
}

function useGetGuests(projectId: string) {
	const [loading, setLoading] = useState(false);
	const [guestsList, setGuestsList] = useState<IGuestList[]>([]);
	useEffect(() => {
		const getGuests = async () => {
			setLoading(true)
			try {
				const res = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/guests/${projectId}`);
				setGuestsList(res.data as IGuestList[]);
			}
			catch (err) {
				console.log(err)
			}
			finally {
				setLoading(false);
			}
			
		};
		getGuests();
	}, []);

	return { loading, guestsList };
}

export {useGetGuests} ;