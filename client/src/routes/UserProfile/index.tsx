// Toast Noti
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@files-ui/react";

//Hooks & Context
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useUserProjectsContext } from "../../context/UserProjectsContext.tsx";
import useGetProjects from "../../hooks/useGetProjects";
import useGetUserProfile from "../../hooks/useGetUserProfile.tsx"

//API
import { LogoutAPI } from "../../foundation/authAPI";

//Component
import ErrorPage from "../ErrorPage/index.tsx"
import LoadingAnimation from "../../foundation/ui/LoadingAnimation.tsx"
import { UpdateUserAvatar } from "../../foundation/authAPI";
import EditProfileModal from "../../components/EditProfileModal";
import { ProfileProject } from "../../components/ProjectsList/Project.tsx";

//Typing and Utils functions
import { IProject } from "../../types/project";



const UserProfile = () => {
	const { user, setUser } = useAuthContext();
	const { projectsList, handleDelete } = useUserProjectsContext();

	
	const navigate = useNavigate();
	const { userEmail } = useParams<{ userEmail: string }>()
	const { userProfile, error } = useGetUserProfile(userEmail!);
	const [profileModal, setProfileModal] = useState(false);
	const { projects } = useGetProjects(userProfile ? userProfile._id : undefined);
	
	const isOwner: boolean = userProfile ? userProfile._id === user._id : false
	const renderedProject = isOwner ? projectsList : projects;

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
			<div className="flex-auto overflow-y-auto">		
				<div className="flex h-full">
					<div className="grow overflow-auto bg-[#0E1525] flex h-full">
						<div className="w-[240px] bg-[#0E1525] border-r-[1px] border-[#2B3245]">	
							<section className="text-[13px] font-[400] leading-[1.3] p-[24px]">
								{userProfile && <header className="mb-[16px] pb-[16px] border-b-[1px] border-[#2B3245]">
									<Avatar readOnly={!isOwner} src={isOwner ? user.thumbnailUrl : userProfile.thumbnailUrl} alt="Avatar" changeLabel={"Upload picture"} onChange={handleUpdateAvatar} accept=".jpg, .jpeg, .png" />		
									<h2 className="text-[18px] font-[600] leading-[1.3] mt-[16px] text-[hsl(0,0%,95%)]">{isOwner ? user.firstName : userProfile.firstName}{isOwner ? user.lastName : userProfile.lastName}</h2>
									<p className="text-[16px] font-[400] mt-[8px] text-[hsl(0,0%,80%)]">{isOwner ? user.email :userProfile.email}</p>
								</header>}		
								{isOwner && <ul className="flex flex-col mt-[40px] gap-[12px] text-[14px]">								
									<li>
										<button onClick={()=>setProfileModal(true)} className="text-[hsl(0,0%,80%)] hover:text-[hsl(0,0%,95%)]">Edit Profile</button>
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
									{renderedProject && <div className="bg-[hsl(220,12%,20%)] flex items-center justify-center text-center rounded-[2px]">
										<div className="m-[4px]">
											<div className="w-[24px] h-[24px] bg-[#0E1525]  flex items-center justify-center text-[hsl(0,0%,80%)] p-[4px]">{renderedProject.owner.length}</div>
										</div>
									</div>
									}
								</div>
								<div className="mx-3">
									{renderedProject ? <>
										{renderedProject.owner.length > 0 ? (						
											<ul>
												{renderedProject.owner.map((project: IProject) => (
													<ProfileProject project={project} key={project._id} isOwner={isOwner} onDelete={handleDelete}/>
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
									</> : <LoadingAnimation />		
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				{profileModal && userProfile && <EditProfileModal setUser={setUser} user={user} userProfile={userProfile} onClose={()=>setProfileModal(false)} /> }
			</div>
		</>
		
	)
	
}

export default UserProfile