import { useEffect, useState } from "react";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useKeyPress from "../../hooks/useKeyPress";
import CodeEditorWindow from "../../components/CodeEditorWindow";
import OutputWindow from "../../components/OutputWindow";
import OutputDetails from "../../components/OutputDetails";
import LanguagesDropdown from "../../components/LanguagesDropdown";

const javascriptDefault = `// some comment`;

export default function Landing(): JSX.Element  {
  const [code, setCode] = useState(javascriptDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
	// const [language, setLanguage] = useState(languageOptions[0]);
  const [language, setLanguage] = useState("javascript");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: any) => {
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
    // We will come to the implementation later in the code
  };

  const checkStatus = async (token: any) => {
    // We will come to the implementation later in the code
  };

  function handleThemeChange(th: any) {
    // We will come to the implementation later in the code
  }
  // useEffect(() => {
  //   defineTheme("cobalt").then(() =>
  //     setTheme({ value: "cobalt", label: "Cobalt" })
  //   );
  // }, []);

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
            language={language}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 font-normal rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
    </>
  );
};
