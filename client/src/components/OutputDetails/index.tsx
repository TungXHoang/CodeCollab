const OutputDetails = ({ outputDetails }: any) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
			<p className="text-sm text-white">
				Status:{" "}
				<span className="font-semibold px-2 py-1 rounded-md bg-gray-700 text-gray-100">
					{outputDetails?.status?.description}
				</span>
			</p>
		
			{outputDetails.memory && 
				<p className="text-sm text-white">
					Memory:{" "}
					<span className="font-semibold px-2 py-1 rounded-md bg-gray-700 text-gray-100">
						{outputDetails.memory}
					</span>
				</p>
			}
			{outputDetails.time && 
				<p className="text-sm text-white">
					Time:{" "}
					<span className="font-semibold px-2 py-1 rounded-md bg-gray-700 text-gray-100">
						{outputDetails?.time}
					</span>
				</p>
			}
    
  </div>
  );
};

export default OutputDetails;