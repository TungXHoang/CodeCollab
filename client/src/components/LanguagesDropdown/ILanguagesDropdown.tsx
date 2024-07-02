
export interface iLanguage {
	id: number,
	name: string,
	label: string,
	value: string
};

export interface iLanguagesDropdown {
	onSelectChange: (sl: iLanguage) => void
}