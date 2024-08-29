import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardSkeleton = () => {
	return (
		<div className="flex-auto overflow-y-auto">
			<div className="flex h-full">
				<div className="grow overflow-auto bg-[#0E1525]">
					<main className="flex flex-col p-[32px] min-h-full w-full text-white">
						<header className="mb-[24px] mt-[10px] flex items-center text-[#F5F9FC] gap-[8px]">

							<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
								<path clipRule="evenodd" fillRule="evenodd" d="M4 21.75A2.75 2.75 0 0 1 1.25 19V5A2.75 2.75 0 0 1 4 2.25h5a.75.75 0 0 1 .624.334l1.777 2.666H20A2.75 2.75 0 0 1 22.75 8v1.213c.835.559 1.34 1.56 1.2 2.643l-.98 7.5a2.75 2.75 0 0 1-2.726 2.394H4ZM3.116 4.116A1.25 1.25 0 0 1 4 3.75h4.599l1.777 2.666A.75.75 0 0 0 11 6.75h9A1.25 1.25 0 0 1 21.25 8v.75H5.256a2.75 2.75 0 0 0-2.506 1.617V5c0-.332.132-.65.366-.884ZM4.278 20.25h15.966a1.25 1.25 0 0 0 1.24-1.088l.978-7.5a1.25 1.25 0 0 0-1.24-1.412H5.256a1.25 1.25 0 0 0-1.24 1.088l-.978 7.5a1.25 1.25 0 0 0 1.24 1.412Z"></path>
							</svg>
						<h2 className="font-[600] text-[20px]">All Projects</h2>
							{/* Dashboard Action Group */}
							<div className="flex items-center ml-auto gap-[12px] text-[13px]">
								<button type="button" className="leading-[30px] rounded-[4px] text-[13px] px-[10px] border-[1px] flex items-center gap-[4px] bg-transparent hover:!bg-[#1C2333] border-[hsl(220,60%,95%)]/[0.14] text-[#F5F9FC]">
									<span className="w-[12px] h-[12px]">
										<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="12px" height="12px">
											<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6z"></path>
										</svg>
									</span>
									<span className="px-[2px] text-[13px]">New</span>
								</button>
								<span className="block relative w-full h-[32px]">
									<svg className="absolute text-[hsl(0,0%,62%)] text-[16px] top-[calc(50%-.5em)] left-[10px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16px" height="16px">
										<path d="M6.5 2a4.5 4.5 0 0 1 3.52 7.3l3.97 3.99-.7.7-3.98-3.97A4.5 4.5 0 1 1 6.5 2m0 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
									</svg>
									<input className="outline-none focus:border-[hsl(205,100%,50%)] focus:!bg-[hsl(0,0%,0%)]/[0.15] text-[hsl(0,0%,94%)] hover:border-[hsl(220,10%,45%)] block h-[32px] py-[4px] pl-[30px] pr-[8px] border-[1px] border-[hsl(220,60%,95%)]/[0.1] bg-transparent rounded-[3px] text-[13px] text-ellipsis" type="search" autoCapitalize="off" autoComplete="off" autoCorrect="off" placeholder="Title or description" />
								</span>
							</div>
						{/*  */}
						</header>
						<div className="mb-[24px]">		
							<div className="flex">		
								<button type="button" className={`bg-[hsl(0,0,0)]/[0.15] text-[hsl(191,91%,69%)] hover:border-[hsl(220,10%,45%)] hover:bg-[hsl(0,0,0)]/[0.15] first:me-[-1px] first:rounded-l last:ms[-1px] last:rounded-r border-[1px] border-opacity-10 border-[hsl(220,60%,95%)] flex items-center px-[14px] py-[9px] text-[12px]`} >
									Create by me
								</button>
								<button type="button" className={`hover:border-[hsl(220,10%,45%)] hover:bg-[hsl(0,0,0)]/[0.15] first:me-[-1px] first:rounded-l last:ms[-1px] last:rounded-r border-[1px] border-opacity-10 border-[hsl(220,60%,95%)] flex items-center px-[14px] py-[9px] text-[12px]`} >
									Shared with me
								</button>
						</div>
						</div>
						<div className="flex flex-col grow">		
							<div className="m-[-30px] mt-0 p-[30px] pt-0">
							<SkeletonTheme
								baseColor="#1B2A41"
								highlightColor="#2E4A6D"
								borderRadius="0.5rem"
								duration={2}>
								<table className="w-full border-collapse">
									<thead>
										
											<tr className="z-10 sticky top-0">
												<th className="headerCell pl-[6px]">
													<span>
														<label>
															<span className="sr-only">Select all projects</span>
															<input type="checkbox" className="_input_custom hover:!bg-transparent checked:!border-[hsl(220,10%,80%)] focus:text-primary focus:ring-offset-0 focus:ring-0 focus:!bg-transparent" ></input>
														</label>
													</span>
												</th>
												<th className="headerCell">
													<span className="headerCellWrapper">Title</span>
												</th>
												<th className="headerCell">
													<span className="headerCellWrapper">Description</span>
												</th>
												<th className="headerCell">
													<span className="headerCellWrapper">Owner</span>
												</th> 
												<th className="headerCell">
													<span className="headerCellWrapper">Guests</span>
												</th>
												<th className="headerCell">
													<span className="headerCellWrapper">Updated</span>
												</th>
												<th className="headerCell">
												</th>
											</tr>
									</thead>
									<tbody>
										{[...Array(4)].map((_, index) => (
											<tr key={index} className={`relative hover:bg-[#2B3245] w-full hover:cursor-pointer`}>
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
										))}
									</tbody>
									</table>
							</SkeletonTheme>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default DashboardSkeleton