import { useContext } from 'react';
import { DataContext } from '@/components/dataProvider';
import { DEFAULT_BUDGET_VALUE } from '@/lib/constants';
import { getMaxDateMonth } from '@/lib/utils';

/**
 * A hook that returns the current budget for a given month.
 */
const useCurrentBudget = (currentMonth: Date) => {
  // Get the list of budgets from the context.
  const { budgets } = useContext(DataContext);

  // Get the last "second" of the current month.
  const maxDate = getMaxDateMonth(currentMonth);

  // Filter all budgets that are before the max date and sort them by date.
  // Then get the first budget that is before the max date.
  const currentBudget = budgets
    .filter((budget) => budget.createdAtDate <= maxDate)
    .sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime())
    .at(0);

  // If there is no budget for the current month, return the default budget value.
  return currentBudget?.value ?? DEFAULT_BUDGET_VALUE;
};

export default useCurrentBudget;
