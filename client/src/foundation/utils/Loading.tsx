// import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-[10em] flex-col">
			 <div className="animate-spin rounded-full h-16 w-16 border-4 border-[hsl(0,0%,40%)] border-t-transparent"></div>
			<p className="text-[14px] mt-[2em] font-serif text-[hsl(0,0%,80%)]">Loading...</p>
    </div>
  );
};

export default Loading;