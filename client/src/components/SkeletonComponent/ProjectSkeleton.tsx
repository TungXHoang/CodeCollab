import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ProjectSkeleton = () => {
	return (
		<SkeletonTheme
			baseColor="#1B2A41"
			highlightColor="#2E4A6D"
			borderRadius="0.5rem"
			duration={2}>
			<tr className={`relative hover:bg-[#2B3245] w-full hover:cursor-pointer`}>
				<td onClick={(e) => e.stopPropagation()} data-cell-type="checkbox" className="cell pl-[6px] pt-[7px]">
					<label className="h-[16px]">
						<span className="sr-only"></span>
						<input onClick={(e) => e.stopPropagation()} type="checkbox" className="checkbox-shadow dashboard-checkbox cursor-pointer focus:text-primary focus:ring-offset-0 focus:ring-0"></input>
					</label>
				</td>
				<td className="cell text-[#E4E8F1]">
					<div className="projectRowCell">
						<span className="w-3/4 mr-10">
							<Skeleton/>
						</span>
					</div>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell w-full">
						<span className="w-full mr-[200px]"><Skeleton/></span>
					</span>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						<span className="w-full mr-10"><Skeleton/></span>
					</span>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						<span className="w-full mr-10"><Skeleton/></span>
					</span>
				</td>
				<td className="cell text-[#E4E8F1]">
					<span className="projectRowCell">
						<span className="w-1/2"><Skeleton/></span>
					</span>
				</td>
			</tr>
		</SkeletonTheme>
	)
}