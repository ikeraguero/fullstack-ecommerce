import { useRef } from "react";

export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  function debouncedFunction(...args) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return debouncedFunction;
}
