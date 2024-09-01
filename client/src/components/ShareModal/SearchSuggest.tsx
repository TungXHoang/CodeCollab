import { useState, useRef, useMemo } from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";

interface ISearchSuggest {
	filterQuery: string,
	setFilterQuery:(user:string)=>void;
}

const SearchSuggest = ({ filterQuery, setFilterQuery }: ISearchSuggest) => {
	const { loadingAllUsers, allUsers } = useGetAllUsers();
	const [showSearchDropdown, setShowSearchDropdown] = useState(false);
	const ulRef = useRef<HTMLUListElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useClickOutside({
		disable: false, isOpen: showSearchDropdown, targetRef: ulRef, toggleButtonRef: inputRef,
		onClickOutside: () => {
			setShowSearchDropdown(false);
		}
	});

	const handleOnClick = (userEmail:string) => {
		setFilterQuery(userEmail);
		setShowSearchDropdown(false);
	}

	const filteredUser = useMemo(() => {
		return allUsers ? allUsers.filter((user) => user.email.toLowerCase().includes(filterQuery.toLowerCase())):undefined;
  }, [filterQuery, allUsers,loadingAllUsers]);
	
	

	return (
		<div className="w-[417px] text-[14px] flex flex-col relative">
			<input ref={inputRef} onFocus={() => setShowSearchDropdown(true)} autoFocus={false} autoComplete="off" required name="email" placeholder="Enter email..." className="text-[13px] outline-none focus:border-[#0079F2] px-2 py-1 w-full bg-[#2B3245] border-[1px] border-[#3C445C] hover:border-[#5F677A] rounded-[4px]" type="email" value={filterQuery} onChange={(e) => setFilterQuery(e.currentTarget.value)} />
			{
				(showSearchDropdown && filteredUser && filterQuery !== "") &&
				<ul ref={ulRef} role="listbox" className={`max-h-[280px] ${filteredUser.length === 0 ? 'hidden':''} absolute w-full flex flex-col shrink-0 outline-none bg-[#2B3245] rounded-[10px] top-[36px] z-10 border-[#3C445C] border-[1px]`}>
					{filteredUser.map((user) => (
						<li key={user._id} onClick={()=>handleOnClick(user.email)} className="hover:bg-[#0053A6] first:rounded-t-[8px] last:rounded-b-[8px] p-[8px] flex flex-row gap-[8px] items-center cursor-pointer">
							<div className="flex gap-[8px] flex-row items-center">
								<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full w-[16px h-[16px] mr-[5px]" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
								<span className="text-[14px] leading-[1.6]">{user.email}</span>
							</div>
						</li>
					))}
				</ul>	
			}
			
		</div>
			
	)
}

export default SearchSuggest