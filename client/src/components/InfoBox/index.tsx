// import Select from "react-select";
// import { customStyles } from "../../foundation/constants/customStyles";
// import { languageOptions } from "../../foundation/constants/languageOptions";
// import { ILanguagesDropdown } from "./ILanguagesDropdown";

interface InfoBoxProps {
  content: string;
}

// Use the interface to type the props parameter
const InfoBox = ({ content }: InfoBoxProps) => {
	const selectedLanguage = content.charAt(0).toUpperCase()
		+ content.slice(1)
	return (
		<>
			<div className= "w-full max-w-56 min-w-48 rounded-[5px] text-[13px] border-black border-2 flex px-3 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)]"> {selectedLanguage} </div>
		</>
  );
};

export default InfoBox;
