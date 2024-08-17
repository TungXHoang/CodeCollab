import SelectionModal from "../../components/SelectionModal"
import { useState } from 'react';
import {IHeaderAction} from "./IHeaderAction"

const HeaderAction = ({onCreate, searchField, setSearchField}:IHeaderAction) => {
	const [showModal, setShowModal] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchField(e.target.value)
	}

	return (
		<>
			<div className="flex items-center ml-auto gap-[12px]">
				<button type="button" onClick={() => setShowModal(true)} className="leading-[30px] rounded-[3px] text-[13px] px-[10px] border-[1px] flex items-center gap-[4px] bg-transparent hover:!bg-[hsl(220,60%,95%)]/[0.06] border-[hsl(220,60%,95%)]/[0.14] text-[hsl(0,0%,80%)]">
					<span className="w-[12px] h-[12px]">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="12px" height="12px">
							<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
						</svg>
					</span>
					<span className="px-[2px] text-[13px]">New</span>
				</button>
				<span className="block relative w-full h-[32px] ">
					<svg className="absolute text-[hsl(0,0%,62%)] text-[16px] top-[calc(50%-.5em)] left-[10px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16px" height="16px">
						<path d="M6.5 2a4.5 4.5 0 0 1 3.52 7.3l3.97 3.99-.7.7-3.98-3.97A4.5 4.5 0 1 1 6.5 2m0 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
					</svg>
					<input value={searchField} onChange={handleChange} className="outline-none focus:border-[hsl(205,100%,50%)] focus:!bg-[hsl(0,0%,0%)]/[0.15] text-[hsl(0,0%,94%)] hover:border-[hsl(220,10%,45%)] block h-[32px] py-[4px] pl-[30px] pr-[8px] border-[1px] border-[hsl(220,60%,95%)]/[0.1] bg-transparent rounded-[3px] text-ellipsis" type="search" autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder="Title or description" />
				</span>
			</div>
			{showModal &&
				<SelectionModal onSelect={setShowModal} onCreate={onCreate} />
			}
		</>
	)
}

export default HeaderAction