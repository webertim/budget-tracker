import { useState } from 'react';

const mapJSONObject = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key.includes('Date') && typeof value === 'string') {
        return [key, new Date(value)];
      } else {
        return [key, value];
      }
    })
  );
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsedItem = JSON.parse(item);

      if (Array.isArray(parsedItem)) {
        return parsedItem.map(mapJSONObject) as T;
      }

      return Object.fromEntries(
        Object.entries(parsedItem).map(([key, value]) => {
          if (key.includes('Date') && typeof value === 'string') {
            return [key, new Date(value)];
          } else {
            return [key, value];
          }
        })
      ) as T;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
