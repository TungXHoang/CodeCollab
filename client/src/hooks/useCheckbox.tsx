import { useState, useEffect } from 'react';

interface Project {
  _id: string;
}

const useCheckbox = (projectsList: Project[], selectAllRef:React.RefObject<HTMLInputElement>) => {
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	const [isChecked, setIsChecked] = useState<string[]>([]);
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
		}
		else if (isChecked.length < projectsList.length) {
			setIsIndeterminate(true);
		}
		else if (isChecked.length === projectsList.length) {
			setIsCheckedAll(true);
			setIsIndeterminate(false);
		}
	},[isChecked,projectsList])

	const handleCheck = ({projectId, checked}:{projectId:string,checked:boolean}) => {
		if (checked) {
			setIsChecked(isChecked.filter(item => item !== projectId))
		}
		else {
			setIsChecked([...isChecked, projectId])
		}
	}

	const handleCheckedAll = () => {
    if (isCheckedAll || isIndeterminate) {
			setIsChecked([]);   
			setIsCheckedAll(false);
    } else {
			setIsChecked(projectsList.map(project => project._id));// Check all items
			setIsCheckedAll(true);
		}
	};

  return {isCheckedAll,isChecked,handleCheck,handleCheckedAll,resetCheckBox};
};

export default useCheckbox;