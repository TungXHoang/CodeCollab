export default function ErrorPage() {
  return (
		<div className="flex h-full justify-center items-center w-full bg-[#0e1525]">
			<div className="flex flex-col margin-auto p-[50px] pt-0 w-full items-center justify-center px-[52px] text-center">
				<div className="w-[40px] h-[40px] mb-[24px] bg-[#ff6d63] error_img"></div>
				<h1 className="text-[36px] font-[400] mb-[24px] text-[hsl(0,0%,100%)]">404: Not Found</h1>
				<p className="text-[16px] font-[400] leading-[2] mb-[8px] text-[hsl(0,0%,100%)]/[0.8]">Sorry, we couldn't find the page you're looking for.</p>
				<p className="text-[16px] font-[400] leading-[2] text-[hsl(0,0%,100%)]/[0.8]">The page may have been moved or deleted, please check the URL and try again.</p>
			</div>
		</div>
  );
}