import { IProject } from "../../types/project";
import { useState } from "react";
import {createSearchParams, useNavigate} from 'react-router-dom';

interface IProjectList{
	owner: IProject[];
	guest: IProject[]
}

const SearchField = ({ projectsList }: { projectsList: IProjectList }) => {
	const [searchField, setSearchField] = useState("");
	const [showSearchDropdown, setShowSearchDropdown] = useState(false);

	const navigate = useNavigate();

	const filterHelper = (projects: IProject[]) => {
		return projects.filter(project =>
			project.title.toLowerCase().includes(searchField.toLowerCase()) ||
			project.description.toLowerCase().includes(searchField.toLowerCase())
		)
	}

	const filteredProject = {
		owner: filterHelper(projectsList.owner),
		guest: filterHelper(projectsList.guest),
	};

	
	const handleKeyDown = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowSearchDropdown(false);
		navigate({
			pathname: "/app",
			search: `?${createSearchParams({ q: searchField })}`,
		});
	};
		
	
	return (
		<form onSubmit={handleKeyDown} className="flex relative w-64 ml-10 font-normal bg-[#1C2333]">
			<span className="block relative w-full h-[32px]">
				<svg className="absolute text-[hsl(0,0%,62%)] text-[16px] top-[calc(50%-.5em)] left-[10px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16px" height="16px">
					<path d="M6.5 2a4.5 4.5 0 0 1 3.52 7.3l3.97 3.99-.7.7-3.98-3.97A4.5 4.5 0 1 1 6.5 2m0 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
				</svg>
				<input onFocus={()=>setShowSearchDropdown(true)} onBlur={()=>setShowSearchDropdown(false)}  value={searchField} onChange={(e)=>setSearchField(e.target.value)} className="w-full text-[14px] outline-none focus:border-[#2B3245] focus:rounded-b-none text-[hsl(0,0%,94%)] border-[#3C445C]  hover:placeholder-[#A2A8AC] block h-[32px] py-[4px] pl-[30px] pr-[8px] border-[1px]  bg-[#1C2333] rounded-[3px] text-ellipsis focus:ring-offset-0 focus:ring-0" type="search" autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder="Search projects..." />
			</span>
			{searchField && showSearchDropdown &&
				<ul className="absolute top-[32px] right-0 left-0 z-20 text-[hsl(0,0%,80%)] bg-[#1C2333] rounded-b-[6px] border-[#2B3245] border-[1px] border-t-0">
				{
					filteredProject.owner.length || filteredProject.guest.length ? (
						<>
							{[...filteredProject.owner, ...filteredProject.guest].map((project) => (
								<li className="text-[12px]  last:rounded-b-[4px] hover:bg-[#2B3245] cursor-pointer" key={project._id}>
									<a onMouseDown={(e) => e.preventDefault()} className="border-b-[1px] border-[#3c3c3c] flex p-2 gap-2 items-center hover:text-[hsl(0,0%,100%)]" href={`${import.meta.env.VITE_CLIENT_BASEURL}/edit/${project._id}`}>
										<img className="w-[16px] h-[16px]" src={`${import.meta.env.VITE_IMAGEKIT_ENDPOINT}${project.language}.png?tr=w-100,h-100,f-png,lo-true`} />		
										<div>{project.title}</div>
									</a>
								</li>
							))}
							<li className="block p-2 text-[12px] text-right">hit enter to display all results &#9166;</li>
						</>	
					) : (
						<li className="text-xs p-2 pt-3">
							<div className="text-left">No projects found</div>
						</li>
					)
				}
				</ul>
			}
		</form>
	)
}

export default SearchField