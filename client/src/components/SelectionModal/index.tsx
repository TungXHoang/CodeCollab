import { languageOptions } from "../../foundation/constants/languageOptions"
import { createProject } from "../../foundation/projectsAPI"
import { useAuthContext } from '../../context/AuthContext';
import { IProject } from "../../components/ProjectsList/IProject"

interface ISelectionModalProps {
	onSelect: (param: boolean) => void,
	onCreate: (project: IProject) => void
}

const SelectionModal = ({ onSelect, onCreate }: ISelectionModalProps) => {
	const handleCreate = async (data: any) => {
		const res = await createProject(data);
		if (res) {
			onCreate(res);
		}
		return;
	}
	const {user} = useAuthContext();
	return (
		<>
			<div
				className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
				onClick={() => onSelect(false)}
			>
				<div className="relative w-auto mx-auto mb-10 w-3/4 text-slate-100"  onClick={(e) => e.stopPropagation()}>
					{/*content*/}
					<div className="border-[1px] border-[#3C445C] rounded-lg shadow-lg relative flex flex-col w-full bg-[#1C2333] outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between px-4 py-4 border-b border-solid border-[#2B3245] rounded-t">
							<h2 className="text-xl font-[500] text-[#F5F9FC]">
								Choose your language
							</h2>
							<button
								className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold "
								onClick={() => onSelect(false)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  viewBox = "0 0 16 16" className="fill-gray-400 hover:fill-slate-50">
									<path fillRule="evenodd" d="m8 8.707 3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708z" clipRule="evenodd"></path>
								</svg>
							</button>
						</div>
						{/*body*/}
						<div className="grid grid-cols-4 gap-6 mx-5 my-10">
							{languageOptions.map((elt,i) => {
								return (
									<div className="hover:bg-[#2B3245] rounded-md flex items-center py-[10px] px-[7px] cursor-pointer" key={i}
										onClick={() => {
											handleCreate({ language: elt.value, languageId:elt.id, owner: user._id, title: elt.label })
											onSelect(false);
										}}>
										<span className="mr-[16px]">
											<img className="w-[32px]" src={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}${elt.value}.png?tr=w-100,h-100,f-png,lo-true`} />
										</span>
										<div className="flex flex-col">
											<span>{elt.value.charAt(0).toUpperCase() + elt.value.slice(1)}</span>
											<span className="text-[11px] opacity-65">{elt.label}</span>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-40 bg-[#0e1525A0]" ></div>
		</>
	)
}

export default SelectionModal;