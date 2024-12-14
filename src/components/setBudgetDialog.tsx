import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { DollarSign, XIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { BudgetContext } from './budgetProvider';

type Props = {
  month: Date;
};

/**
 * A button that opens a dialog to set a new budget for a month.
 * It takes a month to set the budget for and displays a dialog with a form to set the budget.
 */
const BudgetDialogs = ({ month }: Props) => {
  // State of the "set budget" dialog
  const { budgets, setBudget, resetBudget } = useContext(BudgetContext);
  const currentMonthBudget = budgets.find(
    (budget) =>
      budget.createdAtDate.getMonth() === month.getMonth() &&
      budget.createdAtDate.getFullYear() === month.getFullYear()
  );
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // This effect always runs when the value of *open* changes and resets the form.
  useEffect(() => {
    if (!open) {
      setValue(null);
      setError(null);
    }
  }, [open]);

  // Handles the form submission. It sets the budget for the month and closes the dialog.
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

  // Handles the change of the value input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setValue(parseFloat(e.target.value));
    } catch {
      setValue(null);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {currentMonthBudget && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-1" size="sm">
              <XIcon className="text-red-500 w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Budget löschen</DialogTitle>
            </DialogHeader>
            <p>Willst du dein Budget wirklich löschen?</p>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => resetBudget(month)}>Löschen</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={currentMonthBudget ? 'default' : 'outline'}
            className="p-2"
          >
            <DollarSign width={18} />
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
    </div>
  );
};

export default BudgetDialogs;
