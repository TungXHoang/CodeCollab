import React from "react";

interface AlertMessageProps {
	message: string;
	handleClose: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({message,handleClose}) => {
	return (
		<div className="flex items-center px-4 py-[5px] border border-red-400 bg-red-100 text-red-800 mb-2 rounded-md relative">
			<span className="text-[12px] leading-[1.5]">{message}</span>
			<button onClick={handleClose} className="absolute w-[20px] h-[20px] right-[4px] flex items-center justify-center">
				<svg width="16px" height="16px" fill="#8A0000" viewBox="0 0 24 24">
					<path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"></path>
				</svg>
			</button>
		</div>

    );
};
