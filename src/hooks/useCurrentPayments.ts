import { PAYMENTS_KEY } from '@/lib/constants';
import useLocalStorage from './useLocalStorage';
import { Payment } from '@/lib/types';
import { v4 } from 'uuid';

/**
 * A hook that returns the current payments for a given month.
 * It reads the payments from local storage and provides functions to add and remove payments.
 */
const useCurrentPayments = (currentMonth: Date) => {
  const [{ loading, value: payments }, setPayments] = useLocalStorage<
    Payment[]
  >(`${currentMonth.toLocaleDateString()}_${PAYMENTS_KEY}`, []);

  if (loading)
    return {
      loading,
      payments: [],
      addPayment: () => {},
      removePayment: () => {},
    };

  const addPayment = (payment: Omit<Payment, 'id' | 'createdAtDate'>) => {
    setPayments([
      ...payments,
      {
        id: v4(),
        createdAtDate: new Date(),
        ...payment,
      },
    ]);
  };

  const removePayment = (id: string) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  return {
    loading: false,
    payments: payments.sort(
      (a, b) => a.createdAtDate.getTime() - b.createdAtDate.getTime()
    ),
    addPayment,
    removePayment,
  };
};

export default useCurrentPayments;
