import { languageOptions } from "../../foundation/constants/languageOptions"

const SelectionModal = ({ onSelect }: any) => {
	console.log(languageOptions)
	return (
		<>
			<div
				className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
				onClick={() => onSelect(false)}
			>
				<div className="relative w-auto my-6 mx-auto max-w-3xl text-slate-100"  onClick={(e) => e.stopPropagation()}>
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between px-4 py-4 border-b border-solid border-blueGray-200 rounded-t">
							<h2 className="text-xl font-semibold">
								Choose your language
							</h2>
							<button
								className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold "
								onClick={() => onSelect(false)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  viewBox = "0 0 16 16" className="fill-gray-400 hover:fill-slate-50">
									<path fill-rule="evenodd" d="m8 8.707 3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708z" clip-rule="evenodd"></path>
								</svg>
							</button>
						</div>
						{/*body*/}
						<div className="grid grid-cols-4 gap-4 mx-5 my-10">
							{languageOptions.map((e) => {
								return (
									<button>
									 {e.name}
									</button>
								)
							})}
						</div>
				
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>
		</>
	)
}

export default SelectionModal;