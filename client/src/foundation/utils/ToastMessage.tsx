import { toast } from "react-toastify";

export const showSuccessToast = (msg: string) => {
	toast.success(msg || `Compiled Successfully!`, {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		containerId: "EditingToast"
	});
};

export const showErrorToast = (msg: string) => {
	toast.error(msg || `Something went wrong! Please try again.`, {
		position: "top-right",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		containerId: "EditingToast"
	},);
};

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

export const showShareToast = (statusCode: number, msg: string) => {
	if (statusCode === 500) {
		return showErrorToast(msg)
	} 
	else if (statusCode >= 400 && statusCode < 500) {
		return showErrorToast(msg)
	}
	return showSuccessToast(msg)
}

export const showDeleteToast = () => {
	toast.success(`Project deleted successfully!`, {
		bodyClassName: "toast-style",
		icon: false,
		position: "bottom-center",
		autoClose: 100000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		progress: undefined,
		containerId: "DashboardToast",
	});
}