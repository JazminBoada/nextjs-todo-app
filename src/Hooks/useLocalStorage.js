import { useDebugValue, useEffect, useState } from "react";

export function useLocalStorage(key, initialState = []) {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? parse(item) : initialState;
  });
  useDebugValue(state);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

function parse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return [];
  }
}
