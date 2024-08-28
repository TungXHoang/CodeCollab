import { useState, useEffect } from 'react';
import {IProject} from "../components/ProjectsList/IProject"


const useCheckbox = (projectsList: IProject[], selectAllRef:React.RefObject<HTMLInputElement>) => {
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	const [isChecked, setIsChecked] = useState<IProject[]>([]);
	const [isIndeterminate, setIsIndeterminate] = useState(false);

	const resetCheckBox = () => {
		setIsCheckedAll(false);
		setIsChecked([]);
		setIsIndeterminate(false);
	}

	
	useEffect(() => {
		if (selectAllRef.current) {
			selectAllRef.current.indeterminate = isIndeterminate;
		}
  }, [isIndeterminate]);

	useEffect(() => {
		if (isChecked.length === 0) {
			setIsIndeterminate(false)
			setIsCheckedAll(false);
		}
		else if (isChecked.length < projectsList.length) {
			setIsIndeterminate(true);
		}
		else if (isChecked.length === projectsList.length) {
			setIsCheckedAll(true);
			setIsIndeterminate(false);
		}
	},[isChecked,projectsList])

	const handleCheck = ({project, checked}:{project:IProject,checked:boolean}) => {
		if (checked) {
			setIsChecked(isChecked.filter(item => item._id !== project._id))
		}
		else {
			setIsChecked([...isChecked, project])
		}
	}

	const handleCheckedAll = () => {
    if (isCheckedAll || isIndeterminate) {
			setIsChecked([]);   
			setIsCheckedAll(false);
    } else {
			setIsChecked(projectsList.map(project => project));// Check all items
			setIsCheckedAll(true);
		}
	};

  return {isCheckedAll,isChecked,handleCheck,handleCheckedAll,resetCheckBox};
};

export default useCheckbox;