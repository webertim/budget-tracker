import { Preferences } from '@capacitor/preferences';
import { mapJSONObject } from './utils';

const readKeyFromLocalStorage = async <T>(key: string, initialValue: T) => {
  try {
    const { value } = await Preferences.get({ key });
    if (!value) return initialValue;

    const parsedItem = JSON.parse(value);

    if (Array.isArray(parsedItem)) {
      return parsedItem.map(mapJSONObject) as T;
    }

    return mapJSONObject(parsedItem) as T;
  } catch {
    return initialValue;
  }
};

export { readKeyFromLocalStorage };
