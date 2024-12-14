import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BudgetMonth from './components/budgetMonth';
import { BudgetProvider } from './components/budgetProvider';
import { Toaster } from './components/ui/toaster';

const today = new Date();
const mountMonth = new Date(today.getFullYear(), today.getMonth(), 1);

/**
 * The entry point of the application.
 * It renders the BudgetMonth component with the mountMonth set to the first day of the current month.
 */
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BudgetProvider>
        <div className="w-full h-full">
          <BudgetMonth mountMonth={mountMonth} />
        </div>
        <Toaster />
      </BudgetProvider>
    </QueryClientProvider>
  );
}

export default App;
