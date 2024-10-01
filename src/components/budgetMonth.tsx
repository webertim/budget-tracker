import useCurrentBudget from '@/hooks/useCurrentBudget';
import useCurrentPayments from '@/hooks/useCurrentPayments';
import SetBudgetDialog from './setBudgetDialog';
import AddPaymentDialog from './addPaymentDialog';
import PaymentEntry from './paymentEntry';
import BudgetChart from './budgetChart';

type Props = {
  index: number;
  mountMonth: Date;
};

const BudgetMonth = ({ index, mountMonth }: Props) => {
  const month = new Date(mountMonth.getFullYear(), mountMonth.getMonth());
  month.setMonth(month.getMonth() + index);

  const { payments, removePayment, addPayment } = useCurrentPayments(month);

  const budget = useCurrentBudget(month);
  const spent = payments.reduce((acc, payment) => acc + payment.value, 0);

  return (
    <div className="w-screen h-screen overflow-auto p-4 flex flex-col relative">
      <h1 className="text-left w-full text-2xl">
        Hallo <span className="font-semibold">Gerd,</span>
      </h1>
      <h2 className="text-xs font-medium text-black text-opacity-60">
        Willkommen zurück!
      </h2>
      <div className="bg-primary w-full rounded-2xl mt-4 text-background p-2 text-sm font-semibold">
        <div className="flex justify-between items-center">
          <h3>
            {new Intl.DateTimeFormat('de-DE', {
              month: 'long',
              year: 'numeric',
            }).format(month)}
          </h3>
          <SetBudgetDialog month={month} />
        </div>
        <div className="h-36 w-full">
          <BudgetChart budget={budget} spent={spent} month={month} />
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4">Zahlungen</h2>
      <div className="flex-grow flex flex-col gap-4 mt-4">
        {!!payments.length &&
          payments.map((payment) => (
            <PaymentEntry
              payment={payment}
              key={payment.id}
              removePayment={() => removePayment(payment.id)}
            />
          ))}
        {!payments.length && (
          <div className="flex-grow h-full w-full flex items-center justify-center">
            <span className="text-center text-sm  italic text-black/60">
              Keine Zahlungen vorhanden.
            </span>
          </div>
        )}
      </div>
      <AddPaymentDialog addPayment={addPayment} />
    </div>
  );
};

export default BudgetMonth;
