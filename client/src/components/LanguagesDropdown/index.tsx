import Select from "react-select";
import { customStyles } from "../../foundation/constants/customStyles";
import { languageOptions } from "../../foundation/constants/languageOptions";
import { ILanguagesDropdown } from "./ILanguagesDropdown";

export default function LanguagesDropdown ({ onSelectChange }: ILanguagesDropdown)  {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption)=>onSelectChange(selectedOption!)}
    />
  );
};
