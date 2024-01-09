import { TextareaHTMLAttributes, useEffect } from "react";

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: TextareaHTMLAttributes<HTMLTextAreaElement>['value']
) => {
  useEffect(() => {
    if (textAreaRef) {
     
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};