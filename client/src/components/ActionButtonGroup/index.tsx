import ActionButton from "./ActionButton"
import { useState } from "react";
const ActionButtonGroup = ({onSelect}:any) => {
	const [ownership, setOwnership] = useState("owned");

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		setOwnership((e.target as HTMLButtonElement).id)
    onSelect((e.target as HTMLButtonElement).id === "owned");
	}
	
	return (
		<div className="flex"> 
			<ActionButton content="Created by me" id="owned" onClick={handleClick}  ownership= {ownership}  />
			<ActionButton content="Shared with me" id="shared" onClick={handleClick} ownership = {ownership} />
		</div>
	)
}
export default ActionButtonGroup