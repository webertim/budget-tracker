import BudgetMonth from './components/budgetMonth';
import { DataProvider } from './components/dataProvider';

const today = new Date();
const mountMonth = new Date(today.getFullYear(), today.getMonth(), 1);

/**
 * The entry point of the application.
 * It renders the BudgetMonth component with the mountMonth set to the first day of the current month.
 */
function App() {
  return (
    <DataProvider>
      <div className="w-full h-full">
        <BudgetMonth mountMonth={mountMonth} />
      </div>
    </DataProvider>
  );
}

export default App;
