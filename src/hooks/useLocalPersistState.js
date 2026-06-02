import { useState, useEffect } from "react";

const useLocalPersistState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    try {
      const persistValue = window.localStorage.getItem(key);
      if (persistValue !== null && persistValue !== "undefined") {
        return JSON.parse(persistValue);
      }
    } catch (e) {
      // Corrupt/legacy value in localStorage — fall back to the default
      // instead of throwing and crashing the whole component tree on load.
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalPersistState;
