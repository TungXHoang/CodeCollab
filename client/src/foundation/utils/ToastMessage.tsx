import { toast, ToastOptions, Id} from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning" | "default";

const CloseButton = ({ closeToast }: any) => (
	<button
		className="text-white text-center opacity-80 bg-transparent mx-[3px]"
		onClick={closeToast} >
		<svg aria-hidden="true" viewBox = "0 0 14 16" width="13px" height="13px"> 
			<path fill="currentColor" fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>
		</svg>
	</button>
);

const defaultToastOptions: ToastOptions = {
	position: "bottom-center",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}

export const showSuccessToast = (msg: string, options: Partial<ToastOptions> = {}) => {
	const optionsToApply = { ...defaultToastOptions, ...options };
	toast.success(msg || `Compiled Successfully!`, optionsToApply );
};

export const showErrorToast = (msg: string, options: Partial<ToastOptions> = {}) => {
	const optionsToApply = { ...defaultToastOptions, ...options };
	toast.error(msg || `Something went wrong! Please try again.`, optionsToApply);
};

export const showToast = (type:ToastType, msg: string, options: Partial<ToastOptions>) => {
	// const isDashboard = options.containerId === "DashboardToast"
	// if (statusCode >= 400 && statusCode <= 500) {
	// 	return isDashboard ? showDashboardToast(msg, "error") : showErrorToast(msg, options)
	// }
	return showNotiToast(msg, type, options.containerId!);
	// return isDashboard ? showDashboardToast(msg, type) : showSuccessToast(msg, options)
}

// export const showSaveToast = (cb: any) => {
// 	toast.promise(
//     cb,
// 		{
//       pending: 'Saving...', 
//       success: 'Saving successfully',
// 			error: 'Saving unsuccessfully',
// 		},
// 		{containerId: 'EditingToast'}
// 	)
// }



export const showNotiToast = (msg: string, type: ToastType, containerId:Id,) => {
	const dashboardOptions: ToastOptions = {
		icon: false,
		position: "bottom-center",
		autoClose: 1500,
		hideProgressBar: true,
		closeOnClick: true,
		closeButton: CloseButton,
		containerId: containerId,
		style: {
			fontSize: '13px',
			maxHeight: `70px`,
			maxWidth: `fit-content`,
			minHeight: `auto`,
			margin: `0`,
			transform: `none`,
			}
		};
		switch (type) {
			case "success":
				dashboardOptions.style!.backgroundColor = `#044A10`;
				dashboardOptions.style!.color = `#BFFFCA`;
				return toast.success(msg, dashboardOptions);
			case "error":
				dashboardOptions.style!.backgroundColor = `#660000`;
				dashboardOptions.style!.color = `#FFCFCF`;
				return toast.error(msg, dashboardOptions);
			default:
				dashboardOptions.style!.backgroundColor = `hsl(225, 60%, 35%)`;
				return toast(msg, dashboardOptions);
		}
}
