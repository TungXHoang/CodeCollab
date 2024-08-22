import { useEffect } from 'react';

interface IUseClickOutside {
	targetRef: React.MutableRefObject<HTMLDivElement | null>
	toggleButtonRef: React.MutableRefObject<HTMLButtonElement | null>
	onClickOutside: () => void
	isOpen: boolean
}
const useClickOutside = ({ isOpen, targetRef, toggleButtonRef, onClickOutside }: IUseClickOutside) => {
	const handleClickOutside = (event: MouseEvent) => {
		if (targetRef.current && 
			!targetRef.current.contains(event.target as Node) &&
			!(toggleButtonRef.current && toggleButtonRef.current.contains(event.target as Node))) {
				onClickOutside()
		}
	};

  useEffect(() => {
			if (isOpen) {
				document.addEventListener('mousedown', handleClickOutside);
			} else {
				document.removeEventListener('mousedown', handleClickOutside);
			}
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen]);
}

export default useClickOutside