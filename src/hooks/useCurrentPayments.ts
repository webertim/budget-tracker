import { DESCRIPTION_COUNT_KEYS, PAYMENTS_KEY } from '@/lib/constants';
import { Payment } from '@/lib/types';
import { v4 } from 'uuid';
import useData from './useData';
import { useToast } from './use-toast';
import { useQueryClient } from '@tanstack/react-query';

/**
 * A hook that returns the current payments for a given month.
 * It reads the payments from local storage and provides functions to add and remove payments.
 */
const useCurrentPayments = (currentMonth: Date) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { query, mutation } = useData<Payment[]>(
    `${currentMonth.toLocaleDateString()}_${PAYMENTS_KEY}`,
    []
  );

  const addPayment = (payment: Omit<Payment, 'id' | 'createdAtDate'>) => {
    // If the data could not be fetched or is still loading. This function should do nothing
    if (!query.data) return;

    mutation.mutate(
      [...query.data, { id: v4(), createdAtDate: new Date(), ...payment }],
      {
        onError: () =>
          toast({
            title: 'Unerwarteter Fehler',
            description:
              'Beim Hinzufügen der Zahlung ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut.',
            variant: 'destructive',
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [DESCRIPTION_COUNT_KEYS] });
        },
      }
    );
  };

  const removePayment = (id: string) => {
    if (!query.data) return;

    mutation.mutate(
      query.data.filter((payment) => payment.id != id),
      {
        onError: () =>
          toast({
            title: 'Unerwarteter Fehler',
            description:
              'Beim Entfernen der Zahlung ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut.',
            variant: 'destructive',
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [DESCRIPTION_COUNT_KEYS] });
        },
      }
    );
  };

  return {
    query,
    addPayment,
    removePayment,
  };
};

export default useCurrentPayments;
