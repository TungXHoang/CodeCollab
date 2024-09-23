import { useRef, useState} from 'react'
import ShareModal from "../ShareModal"
import { IProject } from "../../types/project";
import useClickOutside from '../../hooks/useClickOutside';
import DeletionAlertModal from "../DeletionAlertModal";
import { IGuestList } from "../../hooks/useGetGuests";

interface IPopoverProps {
	onDelete: (projectsId: string[]) => void;
	onEditGuest: React.Dispatch<React.SetStateAction<IGuestList[] | undefined>>
	project: IProject;
	guestsList: IGuestList[] | undefined
}

const ProjectPopover = ({ guestsList, onDelete, project,onEditGuest }: IPopoverProps) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [open, setOpen] = useState(false); 
	const [showDeletionAlert, setShowDeletionAlert] = useState(false);

	useClickOutside({
		disable: showDeletionAlert, isOpen: open, targetRef: popoverRef, toggleButtonRef: toggleButtonRef,
		onClickOutside: () => {
			setOpen(false)
		}
	})


	const handleToggleModal = (status: boolean) => {
		if (status) {
			setOpen(false);
			setShowModal(status)
			document.body.style.overflow = 'hidden';
		}
		else {
			setShowModal(status)
			document.body.style.overflow = 'unset';
		}
	};

	const handleTogglePopover = (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpen(!open);
	};

	const handleShowDeletionAlert = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowDeletionAlert(true);
	}
	

	return (
		<>
			<div className="flex relative min-h-full items-center">
				<button ref={toggleButtonRef} onClick ={handleTogglePopover} className="w-[38px] h-[38px] align-middle inline-flex items-center justify-center hover:text-[hsl(0,0%,94%)]">
					<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor">
						<path fillRule = "evenodd" d="M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" clipRule="evenodd">
						</path>
					</svg>
				</button>
				{/* //Popover section */}
				{open && <div ref={popoverRef} className="z-40 absolute right-0 w-[220px] top-[80%] bg-[#1C2333] dropdown-shadow rounded-[4px]">
					<ul className="relative m-0 py-[8px] px-1 block m-0">
						<li className="block">
							<button className="popoverButton" onClick={(e: any) => {
								e.stopPropagation()
								handleToggleModal(true)
								}}> 
								<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 64 64" fill="currentColor" className="mr-[8px]">
									<path d="M6.54 55.08a1.91 1.91 0 0 1-.62-.1 2 2 0 0 1-1.38-2c0-.3 2.06-29.34 31.18-31.62V10.92a2 2 0 0 1 3.43-1.4l19.74 20.16a2 2 0 0 1 0 2.8L39.15 52.64a2 2 0 0 1-3.43-1.4V41c-19.44.74-27.41 13-27.49 13.15a2 2 0 0 1-1.69.93Zm33.18-39.26v7.41a2 2 0 0 1-1.93 2c-18.84.69-25.58 13.24-28 21.31 5-4.32 13.91-9.6 27.81-9.6h.09a2 2 0 0 1 2 2v7.41l15-15.26Z"></path>
								</svg>
								Share project
							</button>
						</li>
						<li className="block">
							<button className ="popoverButton text-[hsl(355,80%,65%)]" onClick={handleShowDeletionAlert}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" className="mr-[8px]"> 
									<path fillRule="evenodd" clipRule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zM9 2H6v1h3zM4 13h7V4H4zm2-8H5v7h1zm1 0h1v7H7zm2 0h1v7H9z"></path>
								</svg>
								Delete project
							</button>
						</li>
					</ul>
				</div>}
				{showDeletionAlert && <DeletionAlertModal projectsList={[project]} onDelete={onDelete} onClose={()=>setShowDeletionAlert(false)} />}
			</div>
			{showModal && <ShareModal guestsList={guestsList} onEditGuest={onEditGuest } project={project} onClose={() => handleToggleModal(false)} />}
		</>
	)
}

export default ProjectPopover