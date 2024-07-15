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
	});
};

export const showErrorToast = (msg: string) => {
	toast.error(msg || `Something went wrong! Please try again.`, {
		position: "top-right",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export const showSaveToast = (cb: any) => {
	toast.promise(
    cb,
    {
      pending: 'Saving...',
      success: 'Saving successfully',
			error: 'Saving unsuccessfully',
		}
	)
}