import { useRef } from "react";
import { IAuthUser } from "../../types/auth";
import useClickOutside from "../../hooks/useClickOutside"
import { LogoutAPI } from "../../foundation/authAPI";
import { useNavigate } from 'react-router-dom';

interface IProfileDropdown {
	user: IAuthUser;
	toggleButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
	onClose: () => void;
	isShow: boolean;
}


const ProfileDropdown = ({isShow, user,toggleButtonRef, onClose}:IProfileDropdown) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	useClickOutside({
		disable:false, isOpen: isShow, targetRef: popoverRef, toggleButtonRef: toggleButtonRef,
		onClickOutside: () => {
			onClose()
			document.body.style.overflow = 'unset';
		}
	});
 
	const handleLogout = async () => {
		await LogoutAPI();
		return navigate("/", { replace: true });
	};


	return (
		<div ref={popoverRef} className="z-50 dropdown-shadow absolute top-[45px] right-[10px] w-[230px] bg-[#1C2333] rounded-[4px]">
			<div className="cursor-default flex flex-col items-center text-center px-[16px] pt-[20px] ">
				<img className="w-[60px] h-[60px] bg-[hsl(0,0%,100%)]/[0.9] rounded-full" src="https://api.dicebear.com/9.x/identicon/svg?radius=50&backgroundColor=ffffff,ffffff,ffffff&rowColor=c68ce4" alt="avatar"/>
				<h3 className="leading-[1.375] mt-[10px] mb-[2px] text-[hsl(0,0%,94%)] text-[16px]">{user.firstName}{user.lastName}</h3>
			</div>
			<ul className="py-[8px] px-1 pt-0">
				<li className="block cursor-default py-[8px] before:block before:border-t-[1px] before:border-[hsl(0,0%,100%)]/[0.1]"></li>
				<li className="p-0 m-0"> 
					<a href="/app" className="popoverButton">
						<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
							<path fillRule="evenodd" clipRule="evenodd" d="m8.36 1.37 6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43z"></path>
						</svg>
						Your Dashboard
					</a> 
				</li>
				<li className="p-0 m-0"> 
					<a href="/app" className="popoverButton">
						<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
							<path fillRule="evenodd" clipRule="evenodd" d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A8 8 0 0 0 8.016 16a8 8 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.2 4.2 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.2 4.2 0 0 1 8 10.342a4.18 4.18 0 0 1 2.928 1.166q.552.552.864 1.295.168.432.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.5 2.5 0 0 1-.208-1.024c0-.351.064-.703.208-1.023s.336-.607.576-.847.528-.431.848-.575.672-.208 1.024-.208c.368 0 .704.064 1.024.208s.608.336.848.575c.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.8 2.8 0 0 1-.576.848 2.8 2.8 0 0 1-.848.575 2.72 2.72 0 0 1-2.064 0 2.8 2.8 0 0 1-.848-.575 2.5 2.5 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.2 5.2 0 0 0-.688-1.406 4.9 4.9 0 0 0-1.088-1.135 5.2 5.2 0 0 0-1.04-.608 3 3 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.6 3.6 0 0 0 .528-1.934 3.7 3.7 0 0 0-.288-1.47 3.8 3.8 0 0 0-.816-1.199 3.9 3.9 0 0 0-1.2-.8 3.7 3.7 0 0 0-1.472-.287 3.7 3.7 0 0 0-1.472.288 3.6 3.6 0 0 0-1.2.815 3.8 3.8 0 0 0-.8 1.199 3.7 3.7 0 0 0-.288 1.47q0 .528.144 1.007c.096.336.224.64.4.927.16.288.384.544.624.784q.216.216.48.383a5 5 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a5 5 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"></path>
						</svg>
						Your Profile
					</a> 
				</li>
				<li className="block cursor-default py-[8px] before:block before:border-t-[1px] before:border-[hsl(0,0%,100%)]/[0.1]"></li>
				<li className="p-0 m-0"> 
					<a onClick={handleLogout} className="popoverButton">
						<svg className="mr-[8px] leading-[1.3]" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
							<path fillRule="evenodd" clipRule="evenodd" d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984zM7 14.28l-4-1.34V3.72l4 1.34zm6.52-5.8H8.55v-1h4.93l-1.6-1.6.71-.7 2.47 2.46v.71l-2.49 2.48-.7-.7z"></path>
						</svg>
						Sign Out
					</a> 
				</li>
			</ul>
		</div>
	)
}

export default ProfileDropdown