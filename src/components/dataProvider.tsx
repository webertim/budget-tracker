import useLocalStorage from '@/hooks/useLocalStorage';
import { BUDGETS_KEY, DEFAULT_BUDGET_VALUE } from '@/lib/constants';
import { Budget } from '@/lib/types';
import { isSameMonth } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { createContext, ReactNode } from 'react';

const defaultBudget: Budget = {
  createdAtDate: new Date(),
  value: DEFAULT_BUDGET_VALUE,
};

// The context that holds the budget data.
const DataContext = createContext({
  budgets: [defaultBudget],
  setBudget: (budget: number, month: Date) => {
    console.log('setBudget', budget, month);
  },
});

// The provider that provides the budget data to its children.
const DataProvider = ({ children }: { children: ReactNode }) => {
  // The list of budgets set by the user.
  const [{ loading, value: budgets }, setBudgets] = useLocalStorage<Budget[]>(
    BUDGETS_KEY,
    [defaultBudget]
  );

  // If the budgets are still loading, display a loader.
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin text-primary" />
      </div>
    );
  }

  // The function to set a budget for a specific month.
  const setBudget = (budget: number, targetMonth: Date) => {
    const now = new Date();
    if (isSameMonth(targetMonth, now)) {
      setBudgets([...budgets, { createdAtDate: now, value: budget }]);
    } else {
      // In this case we try to set a budget for another month than the current one
      // In this case we remove all budgets of the target month and add the new budget
      setBudgets([
        ...budgets.filter(
          (budget) => !isSameMonth(targetMonth, budget.createdAtDate)
        ),
        { createdAtDate: targetMonth, value: budget },
      ]);
    }
  };

  return (
    <DataContext.Provider
      value={{
        budgets: budgets,
        setBudget,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
