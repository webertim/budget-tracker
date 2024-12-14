import { readKeyFromLocalStorage } from '@/lib/preferences';
import { Preferences } from '@capacitor/preferences';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useData = <T>(key: string, initialValue: T) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [key],
    queryFn: () => readKeyFromLocalStorage(key, initialValue),
  });

  const mutation = useMutation({
    mutationFn: async (newData: T) => {
      await Preferences.set({ key, value: JSON.stringify(newData) });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return {
    query,
    mutation,
  };
};

export default useData;
