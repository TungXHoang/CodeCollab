
interface IActionButton 
{
	content: string,
	id: string,
	onClick: (e: React.MouseEvent<HTMLElement>) => void
	ownership: string
}


const ActionButton = ({ content, id, onClick, ownership }: IActionButton) => {
	const activeClass = "bg-[hsl(0,0,0)]/[0.15] text-[hsl(191,91%,69%)]"

	return (
		<button onClick={onClick} type="button" id={id} className={`${ownership === id ? activeClass : ""} hover:border-[hsl(220,10%,45%)] hover:bg-[hsl(0,0,0)]/[0.15] first:me-[-1px] first:rounded-l last:ms[-1px] last:rounded-r border-[1px] border-opacity-10 border-[hsl(220,60%,95%)] flex items-center px-[14px] py-[9px] text-[12px]`} >
			{content}
		</button>
			
	)
}

export default ActionButton