import { useEffect } from "react";

 export function useAutosizeTextArea(textAreaRef, value) {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);
}