import { toast, ToastOptions} from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning" | "default";

const CloseButton = ({ closeToast }: any) => (
	<button
		className="text-white opacity-80 bg-transparent"
		onClick={closeToast} >
		<svg aria-hidden="true" viewBox = "0 0 14 16" width="14px" height="16px"> 
			<path fill="currentColor" fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>
		</svg>
	</button>
);

const defaultToastOptions: ToastOptions = {
	position: "top-right",
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

export const showShareToast = (statusCode: number, msg: string, options: Partial<ToastOptions>) => {
	const isDashboard = options.containerId === "DashboardToast"
	if (statusCode >= 400 && statusCode <= 500) {
		return isDashboard ? showDashboardToast(msg, "error") : showErrorToast(msg, options)
	}
	return isDashboard ? showDashboardToast(msg, "success") : showSuccessToast(msg, options)
}

export const showSaveToast = (cb: any) => {
	toast.promise(
    cb,
		{
      pending: 'Saving...', 
      success: 'Saving successfully',
			error: 'Saving unsuccessfully',
		},
		{containerId: 'EditingToast'}
	)
}


export const showDashboardToast = (msg: string, type: ToastType) => {
	const dashboardOptions: ToastOptions = {
		icon: false,
		position: "bottom-center",
		autoClose: 1500,
		hideProgressBar: true,
		closeOnClick: true,
		closeButton: CloseButton,
		containerId: "DashboardToast",
		style: {
			color: "white",
			maxHeight: `70px`,
			minHeight: `auto`
			}
		};
		switch (type) {
			case "success":
				dashboardOptions.style!.backgroundColor = `hsl(225, 60%, 35%)`;
				return toast.success(msg, dashboardOptions);
			case "error":
				dashboardOptions.style!.backgroundColor = `hsl(0, 79%, 57%)`;
				return toast.error(msg, dashboardOptions);
			default:
				dashboardOptions.style!.backgroundColor = `hsl(225, 60%, 35%)`;
				return toast(msg, dashboardOptions);
		}
}
