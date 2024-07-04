import { useEffect, useState } from "react";
import axios from "axios";
import { ClassNames } from "../../foundation/utils/ClassNames.tsx";
import { languageOptions } from "../../foundation/constants/languageOptions.tsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useKeyPress from "../../hooks/useKeyPress";
import CodeEditorWindow from "../../components/CodeEditorWindow";

import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";

import LanguagesDropdown from "../../components/LanguagesDropdown";
import { ILanguage } from "../../components/LanguagesDropdown/ILanguagesDropdown.tsx"; 

import { codeSnippets } from "../../foundation/constants/codeSnippets.tsx"

import {SubmissionAPI} from "../../foundation/compile"

export default function Landing(): JSX.Element  {
	const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState(codeSnippets[language.value as keyof typeof codeSnippets]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);


  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: ILanguage) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
	}, [ctrlPress, enterPress]);
	
  const onChange = ( data: string) => {
		setCode(data);
		return;
  };
	const handleCompile = () => {
		setProcessing(true);
		const formData = {
			language_id: language.id,
			// encode source code in base64
			source_code: btoa(code),
		};
		const options = {
			method: "POST",
			url: import.meta.env.VITE_RAPID_API_URL,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"content-type": "application/json",
				"Content-Type": "application/json",
				"X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
				"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
			},
			data: formData,
		};
	
		axios
			.request(options)
			.then(function (response) {
				console.log("res.data", response.data);
				const token = response.data.token;
				checkStatus(token);
			})
			.catch((err) => {
				let error = err.response ? err.response.data : err;
				setProcessing(false);
				console.log(error);
			});
  };

  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        showSuccessToast(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast(err);
    }
	};
	
	const handleSubmission = async () => {
		const response = await SubmissionAPI(language, code);
		console.log(response)
	}


  const showSuccessToast = (msg: any) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg: any) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
			</div>
			
			{/* Code window and output */}
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
				<div className="flex flex-col w-full h-full justify-start items-end">
					<CodeEditorWindow
            code={code}
            onEdit={onChange}
            language={language.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <button
						// onClick={handleCompile}
							onClick = {handleSubmission}
              disabled={!code}
              className={ClassNames(
                "mt-4 border-2 border-black z-10 font-normal rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
					</button>
					{outputDetails && <OutputDetails outputDetails={outputDetails} />}	
        </div>
         
        </div>
    </>
  );
};
