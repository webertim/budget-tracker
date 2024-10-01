import { PAYMENTS_KEY } from '@/lib/constants';
import useLocalStorage from './useLocalStorage';
import { Payment } from '@/lib/types';
import { v4 } from 'uuid';

const useCurrentPayments = (currentMonth: Date) => {
  const [payments, setPayments] = useLocalStorage<Payment[]>(
    `${currentMonth.toLocaleDateString()}_${PAYMENTS_KEY}`,
    []
  );

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
    payments: payments.sort(
      (a, b) => a.createdAtDate.getTime() - b.createdAtDate.getTime()
    ),
    addPayment,
    removePayment,
  };
};

export default useCurrentPayments;
