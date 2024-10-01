import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { DollarSign } from 'lucide-react';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { DataContext } from './dataProvider';

type Props = {
  month: Date;
};

const SetBudgetDialog = ({ month }: Props) => {
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { setBudget } = useContext(DataContext);

  useEffect(() => {
    if (!open) {
      setValue(null);
      setError(null);
    }
  }, [open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      setError('Bitte ein valides Budget angeben.');
      return;
    }
    if (value < 0) {
      setError('Bitte ein positives Budget angeben.');
      return;
    }
    if (value > 999999) {
      setError('Bitte ein Budget kleiner als 1000€ angeben.');
      return;
    }
    setBudget(value, month);
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setValue(parseFloat(e.target.value));
    } catch {
      setValue(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className=" h-6 w-6 p-1 rounded-full bg-transparent"
        >
          <DollarSign />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Budget anpassen</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col gap-2 w-full items-center"
        >
          <input
            className="w-20 min-w-0 text-center text-3xl border-b-2 border-primary "
            type="number"
            value={value ?? ''}
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit" className="w-32">
              Speichern
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetDialog;
