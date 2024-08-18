import { useEffect, useRef, useState} from 'react'
import { deleteProject } from "../../foundation/projectsAPI"
import ShareModal from "../../components/ShareModal"
import {IProject} from "../ProjectsList/IProject"
interface IPopoverProps {
	open: boolean
	onClose: () => void
	onDelete: (id: string) => void;
	deleteInfo: { projectId: string, userId: string }
	toggleRef: React.MutableRefObject<HTMLButtonElement | null>
	project: IProject
}

const Popover = ({ toggleRef, open, onClose, onDelete, deleteInfo, project }: IPopoverProps) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [showModal, setShowModal] = useState(false);

	const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && 
			!popoverRef.current.contains(event.target as Node) &&
			!(toggleRef.current && toggleRef.current.contains(event.target as Node))) {
      onClose();
		}
	};
	const handleShowModal = (status: boolean) => {
		if (status) {
			setShowModal(true)
			document.body.style.overflow = 'hidden';
			return;
		}
		setShowModal(false)
		document.body.style.overflow = 'unset';
	}

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const handleDelete = async (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const res = await deleteProject({projectId: deleteInfo.projectId , userId: deleteInfo.userId})
		if (res.status === 200) {
			onDelete(deleteInfo.projectId)
		}
		return res;
	}


	return (
		open &&
		<>
			<div ref={popoverRef} className="z-50 absolute right-0 w-[220px] top-[80%] bg-[hsl(222,10%,20%)]">
				<ul className="relative m-0 py-[8px] block m-0">
					<li className="block ">
						<button className="popoverButton" onClick={(e: any) => {
							e.stopPropagation()
							handleShowModal(true)
							}}> 
							<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" className="mr-[8px]">
								<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
							</svg>
							Share project
						</button>
					</li>
					<li className="block">
						<button className ="popoverButton text-[hsl(355,80%,65%)]" onClick={handleDelete}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" className="mr-[8px]"> 
								<path fillRule="evenodd" clipRule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zM9 2H6v1h3zM4 13h7V4H4zm2-8H5v7h1zm1 0h1v7H7zm2 0h1v7H9z"></path>
							</svg>
							Delete project
						</button>
					</li>
				</ul>
			</div>
			{showModal && <ShareModal project={project} onSelect={(status) => handleShowModal(status)} />}
		</>
	)
}

export default Popover