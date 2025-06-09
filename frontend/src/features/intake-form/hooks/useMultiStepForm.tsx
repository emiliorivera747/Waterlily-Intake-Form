import { useState } from "react";
import type { FormSection } from "../types/form";

export const useMultiStepForm = (sections: FormSection[]) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prevIndex) => {
      if (prevIndex >= sections.length - 1) return prevIndex;
      return prevIndex + 1;
    });
  };

  const prev = () => {
    setIndex((prevIndex) => {
      if (prevIndex <= 0) return prevIndex;
      return prevIndex - 1;
    });
  };

  return {
    next,
    prev,
    index,
    section: sections[index],
  };
};
