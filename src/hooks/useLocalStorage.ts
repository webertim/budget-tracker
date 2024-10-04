import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';

/**
 * Converts a JSON object to an object with Date objects.
 * This is necessary because Capacitor's Preferences API only supports strings for dates.
 * But in our application, we want to store Date objects.
 * @param obj The JSON object to convert.
 * @returns The converted object.
 */
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

const readKeyFromLocalStorage = async <T>(key: string, initialValue: T) => {
  try {
    const { value } = await Preferences.get({ key });
    if (!value) return initialValue;

    const parsedItem = JSON.parse(value);

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
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<
    | {
        loading: false;
        value: T;
      }
    | { loading: true; value: null }
  >({
    loading: true,
    value: null,
  });

  useEffect(() => {
    (async () => {
      setStoredValue({
        loading: false,
        value: await readKeyFromLocalStorage(key, initialValue),
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = async (value: T) => {
    try {
      await Preferences.set({ key, value: JSON.stringify(value) });
      setStoredValue({
        loading: false,
        value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
