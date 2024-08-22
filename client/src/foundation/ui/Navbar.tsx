import { useNavigate, Outlet, } from 'react-router-dom';
import React, {useState} from 'react';
import { LogoutAPI } from "../authAPI";
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'



const Navbar = () => {
	const [showModal, setShowModal] = useState(false)
	const navigate = useNavigate();
	const handleLogout = async () => {
		await LogoutAPI();
		return navigate("/", { replace: true });
	};
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ')
	}

		return (
			<>
				{/* <Disclosure as="nav" className="bg-[hsl(220,10%,20%)]">
					{() => (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
								<div className="relative flex h-16 items-center justify-between">
									<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer" onClick={()=>navigate("/app")}>
										<div className="flex flex-shrink-0 items-center">
											<img
												className="h-8 w-auto"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
												alt="Your Company"
											/>
										</div>
										<div className="flex items-center justify-center p-4">
			
									</div>
									</div>

									
									<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
											<div className="flex space-x-4">
												<button className={classNames(
														'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer',
														'rounded-md px-3 py-2 text-sm font-medium',
											)}
											onClick = {()=>setShowModal(true)}>
													+ New Project
												</button>
											
										</div>
										<Menu as="div" className="relative ml-3">
											<div>
												<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</MenuButton>
											</div>
											<MenuItems
												transition
												className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
											>
												<MenuItem>
													{({ focus }) => (
														<a
															href="#"
															className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Your Profile
														</a>
													)}
												</MenuItem>
												<MenuItem >
													{({ focus }) => (
														<a
															onClick ={handleLogout}
															href="#"
															className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Sign out
														</a>
													)}
												</MenuItem>
											</MenuItems>
										</Menu>
									</div>
								</div>
							</div>
						</>
				)}
				</Disclosure> */}
				<header className="nav-shadow flex z-20 relative shrink-0 items-center h-[44px] px-[12px] bg-[hsl(220,10%,20%)]">
					{/* Header Left */}
					<a href="/app" onClick={() => navigate("/app")} className="p-[4px] ml-[10px] flex flex-row items-center">
						<span className="flex items-center justify-center align-center">
							<svg height="28px" width="28px" className='text-[#1389fd]' viewBox="0 0 122.88 79.12" xmlns="http://www.w3.org/2000/svg">
								<path fill="currentColor" fillRule="evenodd" d="M58.63,63.26l3.52-17.9l3.57,5.39c7.69-3.09,12.01-8.18,12.65-16.01c6.32,11.04,2.49,20.95-5.53,26.74l3.64,5.48 L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26L58.63,63.26z M71.71,10.39 c-5.2-2.49-11.02-3.45-16.69-2.9c-5.63,0.54-11.1,2.59-15.62,6.1c-5.23,4.05-9.2,10.11-10.73,18.14l-0.48,2.51l-2.5,0.44 c-2.45,0.43-4.64,1.02-6.56,1.77c-1.86,0.72-3.52,1.61-4.97,2.66c-1.16,0.84-2.16,1.78-3.01,2.8c-2.63,3.15-3.85,7.1-3.82,11.1 c0.03,4.06,1.35,8.16,3.79,11.53c0.91,1.25,1.96,2.4,3.16,3.4c1.22,1.01,2.59,1.85,4.13,2.48c1.53,0.63,3.22,1.08,5.09,1.34h72.55 c3.53-0.85,6.65-2,9.3-3.48c2.63-1.47,4.78-3.26,6.39-5.41c2.5-3.33,3.73-8.04,3.78-12.87c0.06-5.07-1.18-10.16-3.59-13.86 c-0.69-1.07-1.45-2.03-2.25-2.89c-3.61-3.89-8.19-5.59-12.95-5.62c-2.49-0.02-5.06,0.41-7.57,1.22 C83.97,21.62,80.22,14.48,71.71,10.39L71.71,10.39z M91.99,20.65c1.6-0.25,3.2-0.38,4.79-0.36c6.72,0.05,13.2,2.45,18.3,7.95 c1.07,1.15,2.08,2.45,3.03,3.9c3.2,4.92,4.84,11.49,4.77,17.92c-0.07,6.31-1.77,12.59-5.25,17.21c-2.27,3.01-5.18,5.47-8.67,7.42 c-3.36,1.88-7.28,3.31-11.68,4.33l-0.82,0.1H23.38l-0.46-0.04c-2.67-0.34-5.09-0.97-7.29-1.88c-2.27-0.94-4.28-2.15-6.05-3.63 c-1.68-1.4-3.15-2.99-4.4-4.72C1.84,64.25,0.04,58.63,0,53.03c-0.04-5.66,1.72-11.29,5.52-15.85c1.23-1.48,2.68-2.84,4.34-4.04 c1.93-1.4,4.14-2.58,6.64-3.55c1.72-0.67,3.56-1.23,5.5-1.68c2.2-8.74,6.89-15.47,12.92-20.14c5.64-4.37,12.43-6.92,19.42-7.59 c6.96-0.67,14.12,0.51,20.55,3.6C81.9,7.15,88.02,12.76,91.99,20.65L91.99,20.65L91.99,20.65L91.99,20.65z M64.07,24.26l-3.52,17.9 l-3.57-5.39c-7.69,3.09-12.01,8.18-12.65,16.01c-6.32-11.04-2.49-20.95,5.53-26.74l-3.64-5.48L64.07,24.26L64.07,24.26L64.07,24.26 L64.07,24.26L64.07,24.26L64.07,24.26L64.07,24.26z"></path>
							</svg>
						</span>
						<div className="ml-[8px] text-[hsl(0,0%,85%)] text-[18px] font-medium">CodeCollab</div>
					</a>
					<form className="flex relative w-64 mx-4 font-normal">
						<span className="block relative w-full h-[32px]">
							<svg className="absolute text-[hsl(0,0%,62%)] text-[16px] top-[calc(50%-.5em)] left-[10px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16px" height="16px">
								<path d="M6.5 2a4.5 4.5 0 0 1 3.52 7.3l3.97 3.99-.7.7-3.98-3.97A4.5 4.5 0 1 1 6.5 2m0 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
							</svg>
							<input className="w-full text-[14px] outline-none focus:border-[hsl(205,100%,50%)] focus:!bg-[hsl(0,0%,0%)]/[0.15] text-[hsl(0,0%,94%)] hover:border-[hsl(220,10%,45%)] block h-[32px] py-[4px] pl-[30px] pr-[8px] border-[1px] border-[hsl(220,60%,95%)]/[0.1] bg-transparent rounded-[3px] text-ellipsis" type="search" autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder="Search projects..." />
						</span>
					</form>
					{/* Header Right */}
					<div className="flex items-center ml-auto">
						<button onClick={() => setShowModal(true)} className="text-[hsl(191,91%,69%)] flex items-center mx-[4px] p-[8px] border-[1px] border-transparent rounded-[3px] select-none hover:bg-[hsl(220,10%,16.5%)] hover:border-[hsl(220,60%,95%)]/[0.1]">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12px" height="12px" fill="currentColor">
								<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
							</svg>
							<span className="ml-1">New Project</span>
						</button>
						<div className="3"> 
							<button className="w-[35px] height-[35px]  border-[5px] border-transparent hover:border-[hsl(220,10%,16.5%)] rounded-full">
								<img className="bg-white rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=#FFFFFF" alt="avatar"/>
							</button>
						</div>

					</div>
				</header>
				<Outlet context={[showModal, setShowModal]} />
			</>
		)
}

export default React.memo(Navbar);