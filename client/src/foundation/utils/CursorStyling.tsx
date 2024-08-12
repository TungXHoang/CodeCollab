export const CursorStyling = (clientId: number, color: string, name: string) => {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .yRemoteSelectionHead-${clientId} {
      border-left: 2px solid ${color};
      position: relative;
    }
    .yRemoteSelectionHead-${clientId}::before {
      content: '${name}';
      color: white;
      top: -15px;
      position: absolute;
      left: -2px;
      background-color: ${color};
      opacity: 0.8;
      font-size: 10px;
      padding-left: 1px;
      margin-bottom: 8px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
    }
  `;
  document.head.appendChild(styleSheet);
};