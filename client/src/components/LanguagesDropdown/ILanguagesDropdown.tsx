
export interface ILanguage {
	id: number,
	name: string,
	label: string,
	value: string
};

export interface ILanguagesDropdown {
	onSelectChange: (sl: ILanguage) => void
}