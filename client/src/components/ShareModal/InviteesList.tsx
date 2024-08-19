import { IProject, IOwner } from "../ProjectsList/IProject.tsx"

const InviteesList = ({ project, guests }: {project:IProject, guests:IOwner[]}) => {
	return (
		<ul className="p-[20px] pt-0">
			<li className="flex py-[5px] text-[hsl(0,0,80%)] border-t-[1px] border-dashed border-[hsl(220,10%,30%)] last:border-b-[1px]">
				<div className="flex items-center py-[4px]">{project.owner.email}</div>
				<div className="flex items-center ml-auto basis-[140px] py-[4px] px-[8px]">Owner</div>
			</li>
			{
				guests.map(guest =>
					<li key={guest._id} className="flex text-[hsl(0,0,80%)] py-[5px] border-t-[1px] border-dashed border-[hsl(220,10%,30%)] last:border-b-[1px]">
						<div className="flex items-center py-[4px]">{guest.email}</div>
						<div className="flex items-center ml-auto  basis-[140px] px-[8px]">Guest</div>
					</li>
				)
			}
		</ul>
	)
}

export default InviteesList