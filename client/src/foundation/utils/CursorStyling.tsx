export const CursorStyling = (clientId: number, color: string, name: string) => {
	const styleSheet = document.createElement("style");
	styleSheet.innerText = `
		.yRemoteSelection {
			opacity: 0.8;
			background-color: ${color}
			margin-right: -1px;
		}
		.yRemoteSelectionHead-${clientId} {
			position: relative;
			box-sizing: border-box;
			height: 100%;
			border-left: 2px solid ${color};
		}
		.yRemoteSelectionHead-${clientId}::after {
			content: '${name}';
			position: absolute;
			top: -1.4em;
			left: -2px;
			padding: 2px 6px;
			padding-right: 4px;
			background-color: ${color};
			color: #fff;
			border: 0;
			border-radius: 5px;
			border-bottom-left-radius: 0;
			line-height: normal;
			white-space: nowrap;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			pointer-events: none;
			user-select: none;
			word-spacing: -0.3em;
		}
	`;
	document.head.appendChild(styleSheet); 
}

// .yRemoteSelectionHead-${clientId} {
// 	border-left: 2px solid ${color};
// 	position: relative;
// }
// .yRemoteSelectionHead-${clientId}::after {
// 	content: '${name}';
// 	color: white;
// 	top: -15px;
// 	position: absolute;
// 	left: -2px;
// 	background-color: ${color};
// 	opacity: 0.8;
// 	font-size: 10px;
// 	padding-left: 1px;
// 	margin-bottom: 8px;
// 	border-top-right-radius: 5px;
// 	border-bottom-right-radius: 5px;
// 	border-top-left-radius: 5px;
// }

