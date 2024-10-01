import { useContext } from 'react';
import { DataContext } from '@/components/dataProvider';
import { DEFAULT_BUDGET_VALUE } from '@/lib/constants';
import { getMaxDateMonth } from '@/lib/utils';

const useCurrentBudget = (currentMonth: Date) => {
  const { budgets } = useContext(DataContext);

  const maxDate = getMaxDateMonth(currentMonth);

  const currentBudget = budgets
    .filter((budget) => budget.createdAtDate <= maxDate)
    .sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime())
    .at(0);

  return currentBudget?.value ?? DEFAULT_BUDGET_VALUE;
};

export default useCurrentBudget;
