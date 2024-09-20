// Toast Noti
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@files-ui/react";

import { useAuthContext } from "../../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { GetUserProfile } from "../../foundation/authAPI";
import ErrorPage from "../ErrorPage/index"
import { IUser } from "../../types/auth";
import { IProject } from "../../components/ProjectsList/IProject.tsx";
import useGetProjects from "../../hooks/useGetProjects";
import { ResizeImgKit } from "../../foundation/utils/UtilsFunction.tsx";
import { LogoutAPI } from "../../foundation/authAPI";
import { useGetGuests } from "../../hooks/useGetGuests"
import EditProfileModal from "../../components/EditProfileModal";
import { UpdateUserAvatar } from "../../foundation/authAPI";

const LoadingAnimation = () => {
	return (
		<div className="flex justify-center pt-[10em]">
			<div className="loader margin-auto"></div>
		</div>
	)
}

const ProfileProject = ({ project }: { project: IProject }) => {

	const { guestsList } = useGetGuests(project._id);
	return (
		<li className="mb-[12px] relative px-[16px] py-[12px] rounded-[4px] bg-[#1C2333] text-[#C2C8CC] cursor-pointer">
			<a className="text-[#5CD2F4] hover:text-[#80E4FF]" href={`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`}>
				<h3 className="flex items-center text-[#5CD2F4] font-bold">
					<span>{project.title}</span>
				</h3>
				<div className="my-2 text-[#E4E8F1]">{project.description}</div>
				<div className="flex items-center text-[hsl(0,0%,80%)] text-[11px]">
					<div className="flex items-center">
						<img className="w-[16px]" src={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}${project.language}.png?tr=w-100,h-100,f-png,lo-true`} />
						<span className="ml-1 mr-8">{project.language.charAt(0).toUpperCase() + project.language.slice(1)}</span>
					</div>
					<svg className="mt-[1.5px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="20px" height="20px" >
						<path fillRule="evenodd" clipRule="evenodd" d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z"/><path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z"></path>
					</svg>
					<span className="ml-[1px] mr-8">{ guestsList && guestsList.length}</span>
					<span>{project.updatedAt}</span>
				</div>
			</a>
		</li>
	)
}

const UserProfile = () => {
	const navigate = useNavigate();
	const { user, setUser } = useAuthContext();
	const [userProfile, setUserProfile] = useState<IUser | undefined>(undefined);
	const [error, setError] = useState(false);
	const { userEmail } = useParams<{ userEmail: string }>()
	
	const { loading, projects } = useGetProjects(userProfile ? userProfile._id : undefined);
	const [projectsList, setProjectsList] = useState<{ owner: IProject[], guest: IProject[] } | undefined>(undefined);
	const [showModal, setShowModal] = useState(false);
	const isOwner: boolean = userProfile ? userProfile._id === user._id : false
	
	useEffect(() => {
		if (!loading && userProfile && projects) {
			setProjectsList(projects);
    }
  }, [loading,projects,userProfile]);

	useEffect(() => { // move to seperate hook
		async function GetUser () {
			const response = await GetUserProfile({ userEmail: userEmail! })
			if (response) {
				response.thumbnailUrl = ResizeImgKit({ baseUrl: response.thumbnailUrl, newWidth:200, newHeight:200 })
				setUserProfile(response);
				setError(false);
			}
			else {
				setError(true)
			}
		}
		GetUser();
	},[userEmail])

	const handleUpdateAvatar = async (selectedFile: File) => {
		const formData = new FormData();
		formData.append("requestId", user._id);
		formData.append("changeId", userProfile?._id || "");
		formData.append("currentFileName", user.avatar.filename);
		formData.append("image", selectedFile);
	
		const res = await UpdateUserAvatar(formData);
		
		res && setUser(user => user ? {
			...user,
			avatar: res.updatedUser.avatar,
			thumbnailUrl: res.updatedUser.thumbnailUrl,
		} : user);
	};

	const handleLogout = async () => {
		await LogoutAPI();
		return navigate("/", { replace: true });
	};

  if (error) {
    return <ErrorPage/>
  }

	return (
		<>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				containerId="UserProfileToast"
				style={{ width: 'fit-content', height: 'auto', transform: 'none', left:'auto', right: '1em', bottom:'1em' }}
				limit={1}
			/>
			{userProfile && <div className="flex-auto overflow-y-auto">		
				<div className="flex h-full">
					<div className="grow overflow-auto bg-[#0E1525] flex h-full">
						<div className="w-[240px] bg-[#0E1525] border-r-[1px] border-[#2B3245]">	
							<section className="text-[13px] font-[400] leading-[1.3] p-[24px]">
								<header className="mb-[16px] pb-[16px] border-b-[1px] border-[#2B3245]">
									<Avatar readOnly={!isOwner} src={isOwner ? user.thumbnailUrl : userProfile.thumbnailUrl} alt="Avatar" changeLabel={"Upload picture"} onChange={handleUpdateAvatar} accept=".jpg, .jpeg, .png" />		
									<h2 className="text-[18px] font-[600] leading-[1.3] mt-[16px] text-[hsl(0,0%,95%)]">{isOwner ? user.firstName : userProfile.firstName}{isOwner ? user.lastName : userProfile.lastName}</h2>
									<p className="text-[16px] font-[400] mt-[8px] text-[hsl(0,0%,80%)]">{isOwner ? user.email :userProfile.email}</p>
							</header>
								{isOwner &&
									<ul className="flex flex-col mt-[40px] gap-[12px] text-[14px]">								
										<li>
											<button onClick={()=>setShowModal(true)} className="text-[hsl(0,0%,80%)] hover:text-[hsl(0,0%,95%)]">Edit Profile</button>
										</li>
										<li>
											<button onClick={handleLogout} className="text-[hsl(0,0%,80%)] hover:text-[hsl(355,80%,65%)]">Sign out</button>
										</li>
									</ul>	}
							</section>

						</div>
						<div className="flex-auto">
							<div className="max-w-[1200px] px-[16px] ">
								<div className="flex items-center w-full mb-[10px] py-[10px] pt-[18px] px-[12px] gap-[5px]">
									<h2 className="text-[hsl(0,0%,80%)] uppercase font-[500]">Projects</h2>
									{projectsList && <div className="bg-[hsl(220,12%,20%)] flex items-center justify-center text-center rounded-[2px]">
										<div className="m-[4px]">
											<div className="w-[24px] h-[24px] bg-[#0E1525]  flex items-center justify-center text-[hsl(0,0%,80%)] p-[4px]">{projectsList.owner.length}</div>
										</div>
									</div>
									}
								</div>
								<div className="mx-3">
									{projectsList ?							
										<>
											{projectsList.owner.length > 0 ? (						
												<ul>
													{projectsList.owner.map((project: IProject) => (
														<ProfileProject project={project} key={project._id} />
													))}
												</ul>
										) : (
											<div className="w-full max-w-none flex flex-col items-center mx-auto mt-[20px] py-[75px] px-[160px] rounded-[3px] bg-[#1C2A3A]">
												<div className="mb-[20px] text-[14.5px] font-[600] leading-[1.2] text-center text-[#E0E6ED]">No Projects found</div>
												<p className="text-[13px] font-[400] leading-[1.2] w-full text-[hsl(0,0%,100%)]/[0.6] text-center">
													No Projects found
													<br />
													It looks like you don't have any Projects.
												</p>
											</div>
										)}
										</> : 
										<LoadingAnimation />	
									}
								</div>
							</div>
						</div>
					</div>
					
					</div>
				{showModal && <EditProfileModal setUser={setUser} user={user} userProfile={userProfile} onClose={()=>setShowModal(false)} /> }
					</div>
			}
		</>
		
	)
	
}

export default UserProfile