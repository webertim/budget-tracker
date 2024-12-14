import { DESCRIPTION_COUNT_KEYS, PAYMENTS_KEY } from '@/lib/constants';
import { readKeyFromLocalStorage } from '@/lib/preferences';
import { Payment } from '@/lib/types';
import { Preferences } from '@capacitor/preferences';
import { useQuery } from '@tanstack/react-query';

const useDescriptionCount = () => {
  const descriptionCountQuery = useQuery({
    queryKey: [DESCRIPTION_COUNT_KEYS],
    queryFn: async () => {
      const keys = await Preferences.keys();
      const paymentKeys = keys.keys.filter((key) => key.endsWith(PAYMENTS_KEY));

      const payments = await Promise.all(
        paymentKeys.map((paymentKey) =>
          readKeyFromLocalStorage<Payment[]>(paymentKey, [])
        )
      ).then((payments) => payments.flat());

      const descriptionCount: Record<string, number> = {};

      payments.forEach((payment) => {
        const paymentDescription = payment.description ?? '';
        descriptionCount[paymentDescription] =
          (descriptionCount[paymentDescription] ?? 0) + 1;
      });

      const top = Object.entries(descriptionCount)
        .sort((entry1, entry2) => entry1[1] - entry2[1])
        .slice(-20)
        .map((entry) => entry[0]);

      return top;
    },
  });

  return descriptionCountQuery;
};

export default useDescriptionCount;
