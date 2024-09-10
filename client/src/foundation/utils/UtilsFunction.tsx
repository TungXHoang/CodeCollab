interface IResizeImgKit {
	baseUrl: string,
	newWidth: number,
	newHeight: number
}
export const ResizeImgKit = ({ baseUrl, newWidth, newHeight }:IResizeImgKit) => {
	return baseUrl.replace(/w-\d+/,`w-${newWidth}`).replace(/h-\d+/,`h-${newHeight}`);
}