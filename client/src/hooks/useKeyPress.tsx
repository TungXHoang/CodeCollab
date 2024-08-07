import { useState, useEffect } from "react";

const useKeyPress = function (targetKey: any) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }:any) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }:any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

 	useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;