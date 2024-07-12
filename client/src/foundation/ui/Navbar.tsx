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
				<Disclosure as="nav" className="bg-[hsl(220,10%,20%)]">
					{() => (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
								<div className="relative flex h-16 items-center justify-between">
									<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
										{/* Profile dropdown */}
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
				</Disclosure>
				<Outlet context={[showModal, setShowModal]} />
			</>
		)
}

export default React.memo(Navbar);