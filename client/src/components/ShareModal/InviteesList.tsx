import { IProject, IOwner } from "../ProjectsList/IProject.tsx"

const InviteesList = ({ project, guests }: {project:IProject, guests:IOwner[]}) => {
	return (
		<ul className="p-[20px] pt-0">
			<li className="flex text-[hsl(0,0,80%)]">
				<div>{project.owner.firstName}{project.owner.lastName}</div>
				<div className="ml-[10px]">Owner</div>
			</li>
			{
				guests.map(guest =>
					<li key={guest._id} className="flex text-[hsl(0,0,80%)]">
						<div>{guest.firstName}{guest.lastName}</div>
						<div className="ml-[10px]">Guest</div>
					</li>
				)
			}
		</ul>
	)
}

export default InviteesList