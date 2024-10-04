import { Payment } from '@/lib/types';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type Props = {
  payment: Payment;
  removePayment: () => void;
};

/**
 * A parameterized entry for a payment. It takes a payment and a function to remove the payment and displays the payment.
 */
const PaymentEntry = ({ payment, removePayment }: Props) => {
  return (
    <div className="flex justify-between items-center rounded-md bg-card p-2">
      <div className="flex flex-col items-start">
        {payment.description ? (
          <span className="font-medium">{payment.description}</span>
        ) : (
          <span className="font-medium text-black/60 italic">
            Unbenannte Zahlung
          </span>
        )}
        <span className="text-[10px] text-black/60">
          {new Intl.DateTimeFormat('de-DE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(payment.createdAtDate)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{payment.value.toFixed(2)}€</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'ghost'} className="h-6 w-6 p-1 text-destructive">
              <X />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col items-start">
              <DialogTitle>Zahlung löschen?</DialogTitle>
              <DialogDescription className="text-start">
                Bist du sicher, dass du diese Zahlung löschen möchtest?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={removePayment} variant={'destructive'}>
                Bestätigen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentEntry;
