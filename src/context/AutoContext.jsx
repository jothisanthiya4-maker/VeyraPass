
import { createContext, useContext } from "react";

export const AutoContext = createContext(null);

export const useAuto = () => {
  const context = useContext(AutoContext);

  if (!context) {
    throw new Error("useAuto must be used inside AutoProvider");
  }

  return context;
};
