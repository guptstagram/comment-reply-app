import { useState } from "react";

export const useToggle = (intialVal) => {
  const [state, setState] = useState(intialVal);
  const toggle = () => {
    setState((state) => !state);
  };
  return [state, toggle];
};
