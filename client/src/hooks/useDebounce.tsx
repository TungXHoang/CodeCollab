import { useRef, useMemo, useEffect } from "react";
import _ from "lodash"


const useDebounce = (cb: ()=>void) => {
	const ref = useRef<typeof cb>();

	useEffect(() => {
    ref.current = cb;
	}, [cb]);
	
	const debounceCallback = useMemo(() => {
		const func = () => {
			ref.current?.();
		}
		return _.debounce(func,2000,{ 'maxWait': 5000 })
	}, [])
	
	return debounceCallback
}

export default useDebounce