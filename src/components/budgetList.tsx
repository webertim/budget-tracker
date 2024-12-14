import { Payment } from '@/lib/types';
import { UseQueryResult } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import PaymentEntry from './paymentEntry';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

type Props = {
  query: UseQueryResult<Payment[], Error>;
  removePayment: (id: string) => void;
};

const BudgetList = ({ query, removePayment }: Props) => {
  if (query.isLoading) {
    return (
      <div className="flex-grow flex flex-col mt-4">
        <div className="flex-grow h-full w-full flex items-center justify-center">
          <LoaderCircle className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex-grow flex flex-col mt-4">
        <div className="flex-grow h-full w-full flex flex-col items-center text-red-500 justify-center gap-2">
          <ExclamationTriangleIcon />
          <span className="text-center text-sm">
            Ein unerwarteter Fehler ist aufgetreten
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col gap-4 mt-4">
      {query.data.length > 0 ? (
        query.data.map((payment) => (
          <PaymentEntry
            payment={payment}
            key={payment.id}
            removePayment={() => removePayment(payment.id)}
          />
        ))
      ) : (
        <div className="flex-grow h-full w-full flex items-center justify-center">
          <span className="text-center text-sm  italic text-black/60">
            Keine Zahlungen vorhanden.
          </span>
        </div>
      )}
    </div>
  );
};

export default BudgetList;
