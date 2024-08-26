import { useEffect } from 'react';

interface IUseClickOutside {
	targetRef: React.MutableRefObject<HTMLDivElement | HTMLUListElement | null>;
	toggleButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
	onClickOutside: () => void;
	isOpen: boolean;
	disable: boolean;
}
const useClickOutside = ({ disable, isOpen, targetRef, toggleButtonRef, onClickOutside }: IUseClickOutside) => {
	const handleClickOutside = (event: MouseEvent) => {
		if (targetRef.current && 
			!targetRef.current.contains(event.target as Node) &&
			// enable ability to close dropdown/modal when we click the button that trigger open again
			!(toggleButtonRef.current && toggleButtonRef.current.contains(event.target as Node))) {
				onClickOutside()
		}
	};

  useEffect(() => {
		if (isOpen && !disable ) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, disable]);
}

export default useClickOutside