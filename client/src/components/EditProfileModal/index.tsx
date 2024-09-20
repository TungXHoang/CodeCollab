import {useState} from "react"
import { IEditProfileModal, IUpdateInfo } from "./IEditProfileModal";
import { UpdateUserProfile } from "../../foundation/authAPI";


const EditProfileModal = ({ user, setUser, userProfile, onClose }: IEditProfileModal) => {
	const [updateInfo, setUpdateInfo] = useState<IUpdateInfo>({
		newFirstName: userProfile.firstName,
		newLastName: userProfile.lastName,
		newEmail: userProfile.email,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdateInfo((currData) => {
			return {
				...currData,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await UpdateUserProfile({ requestId: user._id, changeId: userProfile._id, ...updateInfo });
		if (res) {
			setUser(user => {
				if (user) {
					return {
						...user,
						email: res.updatedUser.email,
						lastName: res.updatedUser.lastName,
						firstName: res.updatedUser.firstName
					};
				} 
				return user;
			});
		}
	}
	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}>
				<div className="relative mx-auto -translate-y-10 w-full max-w-[480px] text-slate-100" onClick={(e) => e.stopPropagation()}>
					<div className="relative border-[1px] border-[#3C445C] rounded-lg shadow-lg relative flex flex-col w-full bg-[#1C2333] outline-none focus:outline-none p-[16px] gap-[24px]">
						<button onClick={onClose} className="z-10 p-1 ml-auto border-0 absolute top-[8px] right-[8px] text-3xl leading-none font-semibold ">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  viewBox = "0 0 16 16" className="fill-gray-400 hover:fill-slate-50">
								<path fillRule="evenodd" d="m8 8.707 3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708z" clipRule="evenodd"></path>
							</svg>
						</button>
						<div className="relative flex items-start justify-between">
							<h2 className="text-xl font-[500] text-[#F5F9FC]">
								Edit Profile
							</h2>
						</div>
						<form onSubmit={handleUpdate}>
							<div className="flex flex-col gap-[24px]">
								<div className="flex flex-col gap-[8px]">
									<label className="text-[#C2C8CC]">First Name</label>
									<input onChange={handleChange} name="newFirstName" className="transition-[border-color] duration-150 ease-in-out text-[#F5F9FC] text-[13px] font-[400] w-full outline-none px-[7px] py-[7px] h-[30px] border-[#3C445C] border-[1px] rounded-[4px] bg-[#2B3245] hover:border-[#5F677A] focus:outline-[2px] focus:outline-[#0079F2] focus:border-none !outline-offset-[0px]" type="text" value={updateInfo.newFirstName} autoCorrect="off" autoComplete="off" spellCheck="false"></input>
								</div>
								<div className="flex flex-col gap-[8px]">
									<label className="text-[#C2C8CC]">Last Name</label>
									<input onChange={handleChange} name="newLastName" className="transition-[border-color] duration-150 ease-in-out text-[#F5F9FC] text-[13px] font-[400] w-full outline-none px-[7px] py-[7px] h-[30px] border-[#3C445C] border-[1px] rounded-[4px] bg-[#2B3245] hover:border-[#5F677A] focus:outline-[2px] focus:outline-[#0079F2] focus:border-none !outline-offset-[0px]" type="text" value={updateInfo.newLastName} autoComplete="off" autoCorrect="off" spellCheck="false"></input>
								</div>
								<div className="flex flex-col gap-[8px]">
									<label className="text-[#C2C8CC]">Email</label>
									<input onChange={handleChange} name="newEmail" className="transition-[border-color] duration-150 ease-in-out text-[#F5F9FC] text-[13px] font-[400] w-full outline-none px-[7px] py-[7px] h-[30px] border-[#3C445C] border-[1px] rounded-[4px] bg-[#2B3245] hover:border-[#5F677A] focus:outline-[2px] focus:outline-[#0079F2] focus:border-none !outline-offset-[0px]" type="email" value={updateInfo.newEmail} autoComplete="off" autoCorrect="off" spellCheck="false"></input>
								</div>
								<div className="ml-auto flex flex-row gap-[12px]">
									<button onClick={onClose} className="cursor-pointer flex items-center justify-center bg-[#2B3245] rounded-[4px] p-[8px] px-[10px] h-[32px] hover:bg-[#3C445C] transition-[background-color] duration-150 ease-in-out">
										<span>Cancel</span>
									</button>
									<button className="cursor-pointer flex items-center justify-center bg-[#0053A6] hover:bg-[#0079F2] transition-[background-color] duration-150 ease-in-out gap-[6px] h-[32px] p-[8px] rounded-[4px]">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" >
											<path fillRule="evenodd" clipRule="evenodd" d="M20.53 5.47a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06L9 15.94 19.47 5.47a.75.75 0 0 1 1.06 0Z"></path>
										</svg>
										<span>Save</span>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-40 opacity-70 bg-[#0e1525A0]" ></div>
		</>
	)
}

export default EditProfileModal