import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Payment } from '@/lib/types';

type Props = {
  addPayment: (payment: Omit<Payment, 'id' | 'createdAtDate'>) => void;
};

/**
 * A Button that opens a dialog to add a new payment.
 */
const AddPaymentDialog = ({ addPayment }: Props) => {
  // State of the "add payment" dialog
  const [description, setDescription] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // This effect always runs when the value of *open* changes and resets the form.
  useEffect(() => {
    if (!open) {
      setDescription(null);
      setValue(null);
    }
  }, [open]);

  // Handles the form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addPayment({
      value,
      description: description || undefined,
    });
    setOpen(false);
  };

  // Handles the change of the value input
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setValue(parseFloat(e.target.value));
    } catch {
      setValue(null);
    }
  };

  // Handles the change of the description input
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 w-12 rounded-full fixed bottom-4 right-4">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle>Zahlung hinzufügen</DialogTitle>
          <DialogDescription>
            Hier kannst du deine Zahlungen hinzufügen.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex justify-center flex-col gap-2 w-full items-center"
          onSubmit={handleSubmit}
        >
          <Input
            type="number"
            step={0.01}
            value={value ?? ''}
            onChange={handleValueChange}
            placeholder="Betrag"
          />
          <Input
            type="text"
            value={description ?? ''}
            onChange={handleDescriptionChange}
            placeholder="Beschreibung"
          />
          <DialogFooter className="w-full">
            <Button type="submit">Hinzufügen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;
